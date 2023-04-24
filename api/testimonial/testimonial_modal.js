import pool from "../../config/database.js";

export function Create(data, callback) {
  pool.query(
    `INSERT INTO testimonial(username, comment) VALUES (?,?)`,
    [data.username, data.comment],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
export function Get(callback) {
  pool.query(`SELECT * FROM testimonial`, [], (errors, results, fields) => {
    if (errors) {
      return callback(errors);
    }
    return callback(null, results);
  });
}

export function GetRandom(callback) {
  pool.query(
    `SELECT * FROM testimonial order by RAND() LIMIT 6`,
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
    `SELECT * FROM testimonial WHERE id=?`,
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
    `UPDATE testimonial set username=?, comment=? WHERE id=?`,
    [data.username, data.comment, id],
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
    `DELETE FROM testimonial WHERE id=?`,
    [id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
