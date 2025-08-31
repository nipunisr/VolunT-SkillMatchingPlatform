const { log } = require("console");
const { db } = require("../config/db");
const util = require("util");
const bcrypt = require('bcrypt');



const AddNewUser = async (user) => {
    const { name, organizationName, email, password, confirmPassword } = user;
  
    try {
      if (!email || !password || !confirmPassword) {
        throw new Error('Email, Password, and Confirm Password are required.');
      }
  
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
  
      const userQuery = 'INSERT INTO users (email, password) VALUES (?, ?, ?)';
      const userValues = [email, password];
  
      const userResult = await query(userQuery, userValues);
      const userId = userResult.insertId; 
  
      if (organizationName) {
        const organizationQuery = 'INSERT INTO organization (userId, organizationName) VALUES (?, ?)';
        const organizationValues = [userId, organizationName];
        await query(organizationQuery, organizationValues);
      } else if (name) {
        const volunteerQuery = 'INSERT INTO volunteer (userId, name) VALUES (?, ?)';
        const volunteerValues = [userId, name];
        await query(volunteerQuery, volunteerValues);
      }
  
      return { userId, message: 'User successfully created' }; 
  
    } catch (error) {
      console.error('Error in AddNewUser:', error.message);
      return { error: error.message }; 
    }
  };
  
  
module.exports = {AddNewUser};