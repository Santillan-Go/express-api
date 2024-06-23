import { getUserByemail, getUserByname } from "../Model/modelPays.js";
import { ValidationUser } from "./errors.js";

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

export function ValidatetingErrors({ name, password, email }) {
  if (typeof name !== "string")
    throw new ValidationUser("Name must be an string");
  if (typeof password !== "string")
    throw new ValidationUser("Password must be an string");
  if (typeof email !== "string")
    throw new ValidationUser("Email must be an string");
  if (name.length < 3)
    throw new ValidationUser("Name must be at least 3 characters");
  if (password.length < 6)
    throw new ValidationUser("Password must be at least 6 characters");
  if (!isEmail(email)) new ValidationUser(" email provided is not valid");
}

export function ValidatingLends({ name, amount }) {
  if (typeof name !== "string")
    throw new ValidationUser("Name must be an string");
  if (typeof amount !== "number")
    throw new ValidationUser("Amount must be an number");
  if (name.length < 3)
    throw new ValidationUser("Name must be at least 3 characters");
  if (amount <= 0) throw new ValidationUser("Amount must be greater than 0");
}

export async function ValidatingDuplicates({ name, email }) {
  const userFound = await getUserByname({ name });
  if (userFound) throw new ValidationUser("User already exist");

  //   return res.status(400).json({ message: "User already exist" });

  const emailFound = await getUserByemail({ email });
  if (emailFound) throw new ValidationUser("Email already exist");
  // return res.status(400).json({ message: "Email already exist" });
}

export function ValidatePays({ name, idLend }) {
  if (typeof name !== "string")
    throw new ValidationUser("Name must be an string");

  if (name.length < 3)
    throw new ValidationUser("Name must be at least 3 characters");

  if (typeof idLend !== "string")
    throw new ValidationUser("Name must be an string");
}
