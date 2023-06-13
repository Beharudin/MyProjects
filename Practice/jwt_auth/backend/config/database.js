import mysql from "mysql2";

const pool = mysql.createPool({
  host     : 'localhost',
  user: 'root',
  password: '',
  database: "practice",
  connectionLimit: 10,
});

export default pool;
