import { pool } from "../libs/connection.js";
import { ConnectionError } from "../libs/errors.js";

//CREATE USERS

export const createUsers = async ({ name, password, id, email }) => {
  try {
    const connection = await pool.getConnection();

    const result = await connection.query(`INSERT INTO users VALUES(?,?,?,?)`, [
      id,
      name,
      email,
      password,
    ]);
    connection.release();
    return result;
  } catch (error) {
    throw new ConnectionError("Error To connect to database");
  }
};

//CREATE LENDS

export const createLends = async ({ name, amount, idLend, idUser }) => {
  try {
    const connection = await pool.getConnection();
    const result = await connection.query(`INSERT INTO lends VALUES(?,?,?)`, [
      idLend,
      idUser,
      amount,
    ]);
    connection.release();
    return result;
  } catch (error) {
    throw new ConnectionError("Error To connect to database");
  }
};

//PAY LENDS
//DB TABLE PIVOTE
export const payLends = async ({ idUser, idLend, amount, idPay }) => {
  // THIS IS  THE HISTORY, THIS IS GOING TO UPDATE THE LENDS WHEN USER PAY A SMALL AMOUNT OF THE DEBT

  try {
    const connection = await pool.getConnection();
    const [lends, table1] = await connection.query(
      `SELECT * FROM lends WHERE id =?`,
      [idLend]
    );
    const lend = lends[0];
    if (lend.amount === 0) return { amount: 0, message: "Paid" };
    //CREATE THE HISTORY PAY
    const result = await connection.query(`INSERT INTO pays VALUES(?,?,?,?)`, [
      idPay,
      amount,
      idUser,
      idLend,
    ]);

    const newAmount = lend.amount - amount;

    const [result2, table2] = await connection.query(
      `UPDATE lends SET amount =? WHERE id =?`,
      [newAmount, idLend]
    );
    if (result2.affectedRows === 0) return { error: true, notFound: true };

    connection.release();
    return { amount: newAmount, paid: amount };
  } catch (error) {
    throw new ConnectionError("error to connent in db");
  }
};

///GET USER TO VALIDATE

export const getUserByname = async ({ name }) => {
  try {
    const connection = await pool.getConnection();
    const [result, table] = await connection.query(
      `SELECT * FROM users WHERE name =?`,
      [name]
    );

    connection.release();
    if (result.length < 1) return false;
    return result[0];
  } catch (error) {
    throw new ConnectionError("Error To connect to database");
  }
};

export const getUserByemail = async ({ email }) => {
  try {
    const connection = await pool.getConnection();
    const [result, table] = await connection.query(
      `SELECT * FROM users WHERE email =?`,
      [email]
    );
    connection.release();
    if (result.length < 1) return false;
    return true;
  } catch (error) {
    throw new ConnectionError("Error To connect to database");
  }
};

export const getAllLendsByOneUser = async ({ name }) => {
  try {
    const connection = await pool.getConnection();
    const [result, table] = await connection.query(
      `
SELECT lends.amount as amount, lends.id as id  FROM lends 
INNER JOIN users u ON lends.id_user = u.id WHERE u.name =?  AND lends.amount>0; `,
      [name]
    );
    connection.release();
    if (result.length < 1) return false;
    return result;
  } catch (error) {
    throw new ConnectionError("Error To connect to database");
  }
};
