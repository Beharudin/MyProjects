import mysql from "../../config/database.js";

export function Create(data, callback) {
  mysql.query(
    `INSERT INTO customer( full_name, email, mobile, password, gender, dob, account_no, branch, account_type, account_status) VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [
      data.full_name,
      data.email,
      data.mobile,
      data.password,
      data.gender,
      data.dob,
      data.account_no,
      data.branch,
      data.account_type,
      data.account_status,
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
  mysql.query(`SELECT * FROM customer`, [], (errors, results, fields) => {
    if (errors) {
      return callback(errors);
    }
    return callback(null, results);
  });
}
export function GetById(id, callback) {
  mysql.query(
    `SELECT * FROM customer WHERE id=?`,
    [id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
export function GetByAccount(account, callback) {
  mysql.query(
    `SELECT * FROM customer WHERE account_no=?`,
    [account],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
export function checkValidity(value, callback) {
  mysql.query(
    `SELECT * FROM customer WHERE account_no=? OR mobile=?`,
    [value],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
export function Update(data, callback) {
  mysql.query(
    `UPDATE customer set full_name=?, email=?, mobile=?,password=?,gender=?,dob=?,account_no=?,branch=?,account_type=?,account_status=? WHERE id=?`,
    [
      data.full_name,
      data.email,
      data.mobile,
      data.password,
      data.gender,
      data.dob,
      data.account_no,
      data.branch,
      data.account_type,
      data.account_status,
      data.id,
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
  mysql.query(
    `delete from customer where id=?`,
    [id],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
export function GetByMobile(mobile, callback) {
  mysql.query(
    `SELECT * FROM customer WHERE mobile=?`,
    [mobile],
    (errors, results, fields) => {
      if (errors) {
        return callback(errors);
      }
      return callback(null, results[0]);
    }
  );
}
