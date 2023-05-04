import mysql from "mysql2";
import dotenv from "dotenv";
// dotenv.config();

const pool = mysql.createPool({
  host: '192.168.57.216',
  user: 'root',
  password: '',
  database: "bakkalcha",
  connectionLimit: 10,
});

export default pool;
