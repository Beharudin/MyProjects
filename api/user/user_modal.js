import pool from "../../config/database.js";

export function Update(data, id, callback) {
  pool.query(
    `UPDATE user set email=?, password=?, fullname=?,profile_img=? WHERE userId=?`,
    [data.email, data.password, data.fullname, data.profile_img, id],
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
    `SELECT * FROM user WHERE email=?`,
    [email],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}