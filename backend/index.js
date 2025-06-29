const express = require('express');
const cors = require('cors');
const { pool } = require('./config/db'); // Import the pool from db.js
const app = express();
const userRoutes = require("./routes/User");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoutes);




// Start the Express server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});


