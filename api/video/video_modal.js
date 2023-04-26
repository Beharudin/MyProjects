import pool from "../../config/database.js";

export function Create(data, callback) {
  pool.query(
    `INSERT INTO videos(topic, body, link) VALUES (?,?,?)`,
    [
      data.topic,
      data.body,
      data.link,
    ],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
export function Get(callback) {
  pool.query(`SELECT * FROM videos`, [], (errors, results, fields) => {
    if (errors) {
      return callback(errors);
    }
    return callback(null, results);
  });
}


export function Update(data, callback) {
  pool.query(
    `UPDATE videos SET topic=?,body=?,link=?`,
    [
      data.topic,
      data.body,
      data.link,
    ],
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
    `DELETE FROM videos WHERE id=?`,
    [id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
