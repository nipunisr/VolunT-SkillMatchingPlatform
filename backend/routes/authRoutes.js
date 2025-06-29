const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister } = require('../middlewares/validation');

router.post('/create-account', validateRegister, authController.register);

module.exports = router;