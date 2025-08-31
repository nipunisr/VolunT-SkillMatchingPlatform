const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const mysql = require('mysql2/promise');

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


async function queryWithRetry(sql, params, retries = 3) {
  try {
   
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    if (
      retries > 0 &&
      (error.code === 'ECONNRESET' ||
        error.fatal ||
        error.code === 'PROTOCOL_CONNECTION_LOST')
    ) {
      console.warn(`Query failed due to connection reset. Retrying... (${4 - retries})`);
      return queryWithRetry(sql, params, retries - 1);
    }
    throw error;
  }
}

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Successfully connected to Aiven MySQL');
    connection.release();
  } catch (err) {
    console.error('❌ Error connecting to MySQL:', err);
  }
})();
module.exports = { pool, query: queryWithRetry};
