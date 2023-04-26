import pool from "../../config/database.js";

export function Create(data, callback) {
  pool.query(
    `INSERT INTO novels(topic, section, body) VALUES (?,?,?)`,
    [data.topic, data.section, data.body],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
export function Get(callback) {
  pool.query(`SELECT * FROM novels`, [], (errors, results, fields) => {
    if (errors) {
      return callback(errors);
    }
    return callback(null, results);
  });
}
export function GetById(id, callback) {
  pool.query(
    `SELECT * FROM novels WHERE id=?`,
    [id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
export function GetByName(name, callback) {
  pool.query(
    `SELECT * FROM novels WHERE topic = ?`,
    [name],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
export function Update(data, id, callback) {
  pool.query(
    `UPDATE novels set topic=?, section=?, body=?  WHERE id=?`,
    [data.topic, data.section, data.body, id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
export function Delete(id, callback) {
  pool.query(
    `DELETE FROM novels WHERE id=?`,
    [id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
