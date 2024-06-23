import {
  ValidatePays,
  ValidatetingErrors,
  ValidatingDuplicates,
  ValidatingLends,
} from "../libs/validationErrors.js";
import { ValidationUser, ConnectionError } from "../libs/errors.js";
import {
  createLends,
  createUsers,
  getAllLendsByOneUser,
  getUserByname,
  payLends,
} from "../Model/modelPays.js";
import bcrypt from "bcrypt";
export const createusers = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    ValidatetingErrors({ email, name, password });

    await ValidatingDuplicates({ email, name });

    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword, id };
    const [result, table] = await createUsers(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof ValidationUser) {
      return res.status(400).json({ message: error.message });
    }
    if (error instanceof ConnectionError) {
      // TRY TO CONNECT
      return res.status(500).json({ message: "Error in DB" });
    }
  }
};

export const createlends = async (req, res) => {
  const { name, amount } = req.body;
  try {
    ValidatingLends({ amount, name });
    const userFound = await getUserByname({ name });
    if (!userFound) return res.status(400).json({ message: "User not found" });
    const idLend = crypto.randomUUID();

    await createLends({ amount, idLend, name, idUser: userFound.id });
    res.status(201).json({ message: "lends succefully", amount });
  } catch (error) {
    if (error instanceof ValidationUser) {
      return res.status(400).json({ message: error.message });
    }
    if (error instanceof ConnectionError) {
      // TRY TO CONNECT
      return res.status(500).json({ message: "Error in DB" });
    }
  }
};
// FINISH THIS
export const paylends = async (req, res) => {
  const { name, idLend, amount } = req.body;

  try {
    ValidatePays({ idLend, name });
    const userFound = await getUserByname({ name });
    if (!userFound) return res.json({ message: "User not found" });

    const idPay = crypto.randomUUID();
    //THIS HAS TU RETURN THE LEFT AMOUNT TO PAY
    // THE UPDATE OF THE SPECIFYC LEND

    const result = await payLends({
      amount,
      idLend,
      idPay,
      idUser: userFound.id,
    });
    if (result.amount === 0) {
      return res.json(result);
    }

    if (result.notFound) return res.json({ message: "lend not found" });

    res.status(201).json({ message: "pay succefully", ...result });
  } catch (error) {
    if (error instanceof ValidationUser) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof ConnectionError) {
      // TRY TO CONNECT
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getLends = async (req, res) => {
  const { name } = req.params;
  try {
    //  const lends = await getLends();
    // res.status(200).json(lends);
    const result = await getAllLendsByOneUser({ name });

    res.json(result);
  } catch (error) {
    if (error instanceof ConnectionError) {
      // TRY TO CONNECT
      return res.status(500).json({ message: "Error in DB" });
    }
  }
};
