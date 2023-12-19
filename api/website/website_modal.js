import mysql from "../../config/database.js";

export function Get(callback) {
  mysql.query(`SELECT * FROM webinfo`, [], (errors, results, fields) => {
    if (errors) {
      return callback(errors);
    }
    return callback(null, results);
  });
}

export function Update(id, data, callback) {
  mysql.query(
    `UPDATE webinfo set name=?, email=?, mobile=?, address=?, facebook=?, twitter=?, youtube=?, instagram=?, books=?, footer_description=? WHERE id=${id}`,
    [
      data.name,
      data.email,
      data.mobile,
      data.address,
      data.facebook,
      data.twitter,
      data.youtube,
      data.instagram,
      data.books,
      data.footer_description
    ],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
