import pool from "../../config/database.js";

export function Create(data, callback) {
  pool.query(
    `INSERT INTO messages(name, email, message) VALUES (?,?,?)`,
    [data.name, data.email, data.message],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
export function Get(callback) {
  pool.query(`SELECT * FROM messages`, [], (errors, results, fields) => {
    if (errors) {
      return callback(errors);
    }
    return callback(null, results);
  });
}
export function GetById(id, callback) {
  pool.query(
    `SELECT * FROM messages WHERE id=?`,
    [id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}

export function GetByEmail(email, callback) {
  pool.query(
    `SELECT * FROM messages WHERE email=?`,
    [email],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}

export function GetByStatus(status, callback) {
  pool.query(
    `SELECT * FROM messages WHERE status=?`,
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
    `UPDATE messages set name=?, email=?, message=?,status=? WHERE id=?`,
    [data.name, data.email, data.message, data.status, id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}

export function UpdateStatus(data, email, callback) {
  pool.query(
    `UPDATE messages set status=? WHERE email=?`,
    [data.status, email],
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
    `DELETE FROM messages WHERE id=?`,
    [id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
