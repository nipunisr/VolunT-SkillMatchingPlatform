const { query } = require('../config/db');

exports.getSkillsGroupedByCategory = async (req, res) => {
  try {
    const categories = await query('SELECT categoryId, name FROM categories ORDER BY name');
    for (let cat of categories) {
      const skills = await query('SELECT skillId, name FROM skills WHERE categoryId = ? ORDER BY name', [cat.categoryId]);
      cat.skills = skills;
    }
    res.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ success: false, message: 'Server error fetching skills' });
  }
};
