import pool from "../../config/database.js";

export function Create(data, callback) {
  pool.query(
    `INSERT INTO setting(site_name, site_email, site_mobile, site_address, site_facebook_url, site_twitter_url, site_youtube_url, site_logo, site_hero_text) VALUES (?,?,?,?,?,?,?,?,?)`,
    [
      data.name,
      data.email,
      data.mobile,
      data.address,
      data.facebookURL,
      data.twitterURL,
      data.youtubeURL,
      data.logo,
      data.heroText,
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
  pool.query(`SELECT * FROM setting`, [], (errors, results, fields) => {
    if (errors) {
      return callback(errors);
    }
    return callback(null, results);
  });
}
// export function GetById(id, callback) {
//   pool.query(
//     `SELECT * FROM setting WHERE id=?`,
//     [id],
//     (errors, results, fields) => {
//       if (errors) {
//         return callback(errors);
//       }
//       return callback(null, results[0]);
//     }
//   );
// }

export function Update(data, callback) {
  pool.query(
    `UPDATE setting SET site_name=?,site_email=?,site_mobile=?,site_address=?,site_facebook_url=?,site_twitter_url=?,site_youtube_url=?,site_logo=?,site_hero_text=?`,
    [
      data.name,
      data.email,
      data.mobile,
      data.address,
      data.facebookURL,
      data.twitterURL,
      data.youtubeURL,
      data.logo,
      data.heroText,
    ],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results);
    }
  );
}
