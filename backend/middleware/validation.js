const { body, validationResult } = require('express-validator');

exports.validateRegister = [
  body('userName').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('phoneNumber')
    .if(body('userType').equals('volunteer'))
    .notEmpty()
    .withMessage('Phone number is required'),
  body('location')
    .if(body('userType').equals('volunteer'))
    .notEmpty()
    .withMessage('Location is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }
    next();
  }
];