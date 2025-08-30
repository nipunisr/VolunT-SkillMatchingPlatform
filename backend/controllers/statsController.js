// controllers/statsController.js
const { pool } = require("../config/db");

const getStats = async (req, res) => {
  try {
    const [volunteers] = await pool.query("SELECT COUNT(*) AS total FROM volunteers");
    const [organizers] = await pool.query("SELECT COUNT(*) AS total FROM organizers");
    const [events] = await pool.query("SELECT COUNT(*) AS total FROM events");

    res.json({
      volunteers: volunteers[0].total,
      organizers: organizers[0].total,
      events: events[0].total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { getStats };  // ✅ CommonJS export
