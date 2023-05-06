import mysql from "mysql2";
import dotenv from "dotenv";
// dotenv.config();

const pool = mysql.createPool({
  host: '127.0.0.1',
  // host: 'localhost',
  user: 'root',
  password: '',
  database: "bakkalcha",
  connectionLimit: 10,
});

export default pool;
