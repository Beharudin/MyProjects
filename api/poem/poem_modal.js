import pool from "../../config/database.js";

export function Create(data, callback) {
  pool.query(
    `INSERT INTO poems(topic, body) VALUES (?,?)`,
    [data.topic, data.body],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
export function Get(callback) {
  pool.query(`SELECT * FROM poems`, [], (errors, results, fields) => {
    if (errors) {
      return callback(errors);
    }
    return callback(null, results);
  });
}
export function GetById(id, callback) {
  pool.query(
    `SELECT * FROM poems WHERE id=?`,
    [id],
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
    `UPDATE poems set topic=?, body=? WHERE id=?`,
    [data.topic, data.body, id],
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
    `DELETE FROM poems WHERE id=?`,
    [id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
