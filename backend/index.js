require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool } = require('./config/db');
const userRoutes = require('./routes/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/user',userRoutes);

// Test DB connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
  console.log('✅ Connected to database');
  connection.release();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});