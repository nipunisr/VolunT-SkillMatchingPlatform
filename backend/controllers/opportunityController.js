// const { query } = require('../config/database');

// exports.createOpportunity = async (req, res) => {
//   try {
//     const { organizerId, title, description, location, isRemote } = req.body;
//     const [result] = await query(
//       `INSERT INTO events 
//        (organizerId, title, description, location, isRemote) 
//        VALUES (?, ?, ?, ?, ?)`,
//       [organizerId, title, description, location, isRemote]
//     );
//     res.status(201).json({ id: result.insertId });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getOpportunities = async (req, res) => {
//   try {
//     const [rows] = await query(
//       `SELECT o.*, u.userName as organizerName 
//        FROM events o
//        JOIN users u ON o.organizerId = u.id
//        WHERE o.status = 'active'`
//     );
//     res.json(rows);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };