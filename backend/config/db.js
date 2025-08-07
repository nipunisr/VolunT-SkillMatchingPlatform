const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const mysql = require('mysql2');
const util = require('util');

// ✅ First create the pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Then promisify query AFTER pool is defined
const query = util.promisify(pool.query).bind(pool);
const promisePool = pool.promise();


// ✅ Optional: log connection success
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Successfully connected to Aiven MySQL');
  connection.release();
});

module.exports = { pool, query, promisePool };
