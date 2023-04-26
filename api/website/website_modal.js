import mysql from "../../config/database.js";

export function Get(callback) {
  mysql.query(`SELECT * FROM website`, [], (errors, results, fields) => {
    if (errors) {
      return callback(errors);
    }
    return callback(null, results);
  });
}

export function Update(data, callback) {
  mysql.query(
    `UPDATE website set name=?, email, mobile, address, facebook, twitter, youtube, instagram, books, footer_description, logo=? WHERE id=?`,
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
      data.footer_description,
      data.logo,
    ],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
