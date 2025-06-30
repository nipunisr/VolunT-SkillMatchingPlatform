const { log } = require("console");
const { db } = require("../config/db");
const util = require("util");
//const query = util.promisify(db.query).bind(db);
const bcrypt = require('bcrypt');



const AddNewUser = async (user) => {
    const { name, organizationName, email, password, confirmPassword } = user;
  
    try {
      // Check if required fields are present
      if (!email || !password || !confirmPassword) {
        throw new Error('Email, Password, and Confirm Password are required.');
      }
  
      // Check if passwords match
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
  
      const userQuery = 'INSERT INTO users (email, password) VALUES (?, ?, ?)';
      const userValues = [email, password];
  
      // Insert into the users table
      const userResult = await query(userQuery, userValues);
      const userId = userResult.insertId; // Retrieve the newly inserted user's ID
  
      if (organizationName) {
        // Insert into the organization table
        const organizationQuery = 'INSERT INTO organization (userId, organizationName) VALUES (?, ?)';
        const organizationValues = [userId, organizationName];
        await query(organizationQuery, organizationValues);
      } else if (name) {
        // Insert into the volunteer table
        const volunteerQuery = 'INSERT INTO volunteer (userId, name) VALUES (?, ?)';
        const volunteerValues = [userId, name];
        await query(volunteerQuery, volunteerValues);
      }
  
      return { userId, message: 'User successfully created' }; // Return success message and ID
  
    } catch (error) {
      console.error('Error in AddNewUser:', error.message);
      return { error: error.message }; // Return error message to be handled on the frontend
    }
  };
  
  
module.exports = {AddNewUser};