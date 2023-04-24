import pool from "../../config/database.js";

export function Create(data, callback) {
  pool.query(
    `INSERT INTO services(service_name, service_image, service_desc, service_category, service_status) VALUES (?,?,?,?,?)`,
    [data.name, data.image, data.description, data.category, data.status],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
export function Get(callback) {
  pool.query(`SELECT * FROM services`, [], (errors, results, fields) => {
    if (errors) {
      return callback(errors);
    }
    return callback(null, results);
  });
}
export function GetById(id, callback) {
  pool.query(
    `SELECT * FROM services WHERE id=?`,
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
    `SELECT * FROM services WHERE service_name = ?`,
    [name],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
export function GetByStatus(status, callback) {
  pool.query(
    `SELECT * FROM services WHERE service_status = ?`,
    [status],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
export function Update(data, id, callback) {
  pool.query(
    `UPDATE services set service_name=?, service_image=?, service_desc=?,service_category=?,service_status=? WHERE id=?`,
    [data.name, data.image, data.description, data.category, data.status, id],
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
    `DELETE FROM services WHERE id=?`,
    [id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
