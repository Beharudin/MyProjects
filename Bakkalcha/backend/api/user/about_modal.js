import pool from "../../config/database.js";

export function Create(data, callback) {
  pool.query(
    `INSERT INTO about(about_title,about_text, about_lists,about_img) VALUES (?,?,?,?)`,
    [data.title, data.text, data.lists, data.img],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
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
    `UPDATE about set about_title=?, about_text=?, about_lists=?, about_img=?`,
    [data.title, data.text, data.lists, data.img],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
