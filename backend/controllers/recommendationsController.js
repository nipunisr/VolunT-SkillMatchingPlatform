

const { query } = require('../config/db');

exports.createRecommendation = async (req, res) => {
  try {
    const {
      application_id,
      volunteer_id,
      event_id,
      recommendation_text,
      rating
    } = req.body;

    if (!volunteer_id || !event_id || !recommendation_text) {
      return res.status(400).json({
        success: false,
        message: 'Volunteer ID, event ID, and recommendation text are required'
      });
    }

    const organizer_id = req.user.userId;

    const sql = `
      INSERT INTO recommendations 
      (application_id, organizer_id, volunteer_id, event_id, recommendation_text, rating) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      application_id || null, 
      organizer_id,
      volunteer_id,
      event_id,
      recommendation_text,
      rating
    ]);

    res.json({
      success: true,
      message: 'Recommendation created successfully',
      recommendationId: result.insertId
    });
  } catch (error) {
    console.error('Error creating recommendation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create recommendation'
    });
  }
};

exports.getVolunteerRecommendations = async (req, res) => {
  try {
    const { volunteerId } = req.params;

    const sql = `
      SELECT r.*, u.userName as organizer_name, e.title as event_title
      FROM recommendations r
      JOIN users u ON r.organizer_id = u.userId
      JOIN events e ON r.event_id = e.opportunityId
      WHERE r.volunteer_id = ?
      ORDER BY r.created_at DESC
    `;

    const recommendations = await query(sql, [volunteerId]);

    res.json({
      success: true,
      recommendations
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recommendations'
    });
  }
};