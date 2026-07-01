const express = require('express');
const authController = require('../controllers/authController');
const authenticate = require('../middleware/auth');
const validate = require('../middleware/validate');
const asyncHandler = require('../utils/asyncHandler');
const { registerValidator, loginValidator } = require('../validators/authValidators');

const router = express.Router();

router.post(
  '/register',
  registerValidator,
  validate,
  asyncHandler(authController.register)
);

router.post(
  '/login',
  loginValidator,
  validate,
  asyncHandler(authController.login)
);

router.get('/me', authenticate, asyncHandler(authController.me));

module.exports = router;
