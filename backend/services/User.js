
const { log } = require("console");
// //const { db } = require('../config/db');
const { query } = require('../config/db');
const util = require("util");
const bcrypt = require('bcrypt');
//const query = util.promisify(db.query).bind(db);
// Returns User With Id
const GetUserById = async (id) => {
  const queryString = 'SELECT * FROM users WHERE id = ?';
  try {
    const results = await query(queryString, [id]);
    return results[0]; // Assuming the query returns only one user
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
// Returns List of Users
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
  const { fName, lName, userName, password, email, userType, location } = user;

  try {
    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const queryString = 'INSERT INTO users (fName, lName, userName, password, email, userType, location) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [fName, lName, userName, hashedPassword, email, userType, location];

    const results = await query(queryString, values);
    return { success: true, message: "User Successfully Created" };

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return { success: false, message: 'Email already exists' };
    }
    throw error;
  }
};


const SendMessage = async (message, senderUserId) => {
  try {
    

    const insertQuery = 'INSERT INTO messages (userId, content, createdAt) VALUES (?, ?, NOW())';
    await query(insertQuery, [senderUserId ,message]);
    console.log("----------------")
    console.log(senderUserId)
    // Remove older messages if more than three
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



//const saltRounds = 10; 

// const updateCred = async (id, username, newPassword) => {
//     try {
//         const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
//         const sql = `UPDATE users SET username = ?, password = ? WHERE id = ?`;
//         const [result] = await db.query(sql, [ id, username, hashedPassword]);

//         return result.affectedRows > 0;
//     } catch (error) {
//         console.log('Error updating credentials :', error);
//         throw error;
//     }
// };
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
  UpdateUserById,
  SendMessage,
  UpdateProfileById,
  updateCred
};