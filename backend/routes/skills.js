const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');

router.get('/', skillsController.getSkillsGroupedByCategory);

module.exports = router;
