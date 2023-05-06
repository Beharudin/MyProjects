import mysql from "mysql2";
import dotenv from "dotenv";
// dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  // host: '192.168.77.225',
  user: 'root',
  password: '',
  database: "bakkalcha",
  connectionLimit: 10,
});

export default pool;
