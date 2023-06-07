import pool from "../../config/database.js";

export function Update(data, id, callback) {
  pool.query(
    `UPDATE users set username=?, email=?, password=? WHERE id=?`,
    [data.username, data.email, data.password, id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}

export function GetByEmail(email, callback) {
  pool.query(
    `SELECT * FROM users WHERE email=?`,
    [email],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}