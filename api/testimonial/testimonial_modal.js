import pool from "../../config/database.js";

export function Create(data, callback) {
  pool.query(
    `INSERT INTO testimonials(name, comment, img) VALUES (?,?, ?)`,
    [data.name, data.comment, data.img],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
export function Get(callback) {
  pool.query(`SELECT * FROM testimonials`, [], (errors, results, fields) => {
    if (errors) {
      return callback(errors);
    }
    return callback(null, results);
  });
}

export function GetRandom(callback) {
  pool.query(
    `SELECT * FROM testimonials order by RAND() LIMIT 6`,
    [],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
export function GetById(id, callback) {
  pool.query(
    `SELECT * FROM testimonials WHERE id=?`,
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
    `UPDATE testimonials set name=?, comment=?, img=? WHERE id=?`,
    [data.name, data.comment, data.img, id],
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
    `DELETE FROM testimonials WHERE id=?`,
    [id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
