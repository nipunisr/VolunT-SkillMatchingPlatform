
const { log } = require("console");
const { query } = require('../config/db');
const util = require("util");
const bcrypt = require('bcrypt');

const GetUserById = async (id) => {
  const queryString = 'SELECT * FROM users WHERE id = ?';
  try {
    const results = await query(queryString, [id]);
    return results[0]; 
  } catch (error) {
    throw error;
  }
};
const UpdateProfileById = async (id, updatedProfileData) => {
  const {
    fName,
    lName,
    email,
    address
  } = updatedProfileData;
  const queryString = 'UPDATE users SET fName = ?, lName = ?, email = ?, address = ? WHERE id = ?';

  try {
    const results = await query(queryString, [fName, lName, email, address, id]);
    return results.affectedRows > 0; 
    
  } catch (error) {
    throw error;
  }
  
};
const UpdateUserById = async (id, updatedUserData) => {
  const {
    fName,
    lName,
    username,
    password,
    email,
    role,
    status
  } = updatedUserData;
 console.log(updatedUserData)
  const queryString = 'UPDATE users SET fName = ?, lName = ?, username = ?, password = ?, email = ?, role = ?, status = ? WHERE id = ?';
 
  try {
    const results = await query(queryString, [fName, lName, username, password, email, role, status, id]);
    return results.affectedRows > 0; 
    
  } catch (error) {
    throw error;
  }
  
};

const GetListOfUsers = async () => {
  const queryString = 'SELECT * FROM users WHERE status = 1';
  try {
    const results = await query(queryString);
    console.log("this is from getlistofallusers") 
   console.log(results)
    return results;
  } catch (error) {
    throw error;
  }
};


const DeleteUserById = async (id) => {
  const queryString = 'UPDATE users SET status = 0 WHERE id = ?';
  try {
    const results = await query(queryString, [id]);
    return results.affectedRows > 0; // Check if any row was affected
  } catch (error) {
    throw error;
  }
};


const saltRounds = 10;
const AddNewUser = async (user) => {
  const {
    userName,
    email,
    phoneNumber = null,
    location = null,
    password,
    userType
  } = user;

  if (!userName || !password || !email || !userType) {
    return { success: false, message: 'Missing required fields' };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertUserQuery = `
      INSERT INTO users (userName, email, phoneNumber, location, password, userType)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [userName, email, phoneNumber, location, hashedPassword, userType];

    const result = await query(insertUserQuery, values);
    const userId = result.insertId; 

    console.log('Inserting into role table for userType:', userType);

try {
  if (userType === 'volunteer') {
    await query('INSERT INTO volunteers (userId) VALUES (?)', [userId]);
  } else if (userType === 'organizer') {
    await query('INSERT INTO organizers (userId) VALUES (?)', [userId]);
  }
} catch (err) {
  console.error('Error inserting into role table:', err);
  return { success: false, message: 'Failed to insert role data' };
}

    return { success: true, message: "User Successfully Created", userId };

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return { success: false, message: 'Email already exists' };
    }
    return { success: false, message: error.message || 'Database error' };
  }
};


const updateUserAndChild = async (userId, userData, childData) => {
  const connection = await db.getConnection(); 
  try {
    await connection.beginTransaction();

    await connection.query(
      `UPDATE users SET userName = ?, email = ?, phoneNumber = ?, location = ? WHERE userId = ?`,
      [userData.userName, userData.email, userData.phoneNumber, userData.location, userId]
    );

    if (userData.userType === 'organizer') {
      const [result] = await connection.query(
        `UPDATE organizers SET organizationName = ?, registeredNumber = ?, website = ?, contactPerson = ?, address = ? WHERE userId = ?`,
        [
          childData.organizationName,
          childData.registeredNumber || null,
          childData.website || null,
          childData.contactPerson || null,
          childData.address || null,
          userId
        ]
      );

      if (result.affectedRows === 0) {
        await connection.query(
          `INSERT INTO organizers (userId, organizationName, registeredNumber, website, contactPerson, address)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            userId,
            childData.organizationName,
            childData.registeredNumber || null,
            childData.website || null,
            childData.contactPerson || null,
            childData.address || null
          ]
        );
      }
    } else if (userData.userType === 'volunteer') {
      const [result] = await connection.query(
        `UPDATE volunteers SET skills = ?, availability = ? WHERE userId = ?`,
        [
          childData.skills || null,
          childData.availability || null,
          userId
        ]
      );

      if (result.affectedRows === 0) {
        await connection.query(
          `INSERT INTO volunteers (userId, skills, availability) VALUES (?, ?, ?)`,
          [
            userId,
            childData.skills || null,
            childData.availability || null
          ]
        );
      }
    }

    await connection.commit();
    return { success: true, message: 'User and related data updated successfully' };
  } catch (error) {
    await connection.rollback();
    return { success: false, message: error.message };
  } finally {
    connection.release();
  }
};



const SendMessage = async (message, senderUserId) => {
  try {
    
    const insertQuery = 'INSERT INTO messages (userId, content, createdAt) VALUES (?, ?, NOW())';
    await query(insertQuery, [senderUserId ,message]);
    console.log("----------------")
    console.log(senderUserId)
    const deleteQuery = `
    DELETE FROM messages
    WHERE id NOT IN (
      SELECT id
      FROM (
        SELECT id
        FROM messages
        ORDER BY createdAt DESC
        LIMIT 3
      ) as subquery
    );
    `;
    await query(deleteQuery, [senderUserId]);

    return true;
  } catch (error) {
    console.log('Error sending message and managing messages:', error);
    throw error;
  }
};




const updateCred = async (username ,id, newPassword) => {
  try {
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      const sql = `UPDATE users SET username = ?, password = ? WHERE id = ?`;
      const result = await db.query(sql, [  id, hashedPassword ,username]);

      // Assuming result is an object that contains the property 'affectedRows'
      if ('affectedRows' in result) {
          return result.affectedRows > 0;
      } else {
          console.log('Unexpected result structure:', result);
          return false;
      }
  } catch (error) {
      console.log('Error updating credentials:', error);
      throw error;
  }
};

module.exports = {
  GetUserById,
  GetListOfUsers,
  DeleteUserById,
  AddNewUser,
  updateUserAndChild,
  UpdateUserById,
  SendMessage,
  UpdateProfileById,
  updateCred
};