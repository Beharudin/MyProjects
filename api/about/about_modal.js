import pool from "../../config/database.js";

export function Get(callback) {
  pool.query(`SELECT * FROM about`, [], (errors, results, fields) => {
    if (errors) {
      return callback(errors);
    }
    return callback(null, results);
  });
}
export function GetById(id, callback) {
  pool.query(
    `SELECT * FROM about WHERE id=?`,
    [id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}

export function Update(data, callback) {
  pool.query(
    `UPDATE about set description=?, img=? where id=?`,
    [data.description, data.img, data.id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
