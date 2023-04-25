import pool from "../../config/database.js";

export function Create(data, callback) {
  pool.query(
    `INSERT INTO features(feature_name, feature_desc, feature_icon) VALUES (?,?,?)`,
    [data.name, data.description, data.icon],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
export function Get(callback) {
  pool.query(`SELECT * FROM features`, [], (errors, results, fields) => {
    if (errors) {
      return callback(errors);
    }
    return callback(null, results);
  });
}
export function GetById(id, callback) {
  pool.query(
    `SELECT * FROM features WHERE id=?`,
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
    `SELECT * FROM features WHERE feature_name = ?`,
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
    `UPDATE features set feature_name=?, feature_desc=?, feature_icon=?  WHERE id=?`,
    [data.name, data.description, data.icon, id],
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
    `DELETE FROM features WHERE id=?`,
    [id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
