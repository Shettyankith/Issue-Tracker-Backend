const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', authenticate, asyncHandler(userController.listUsers));

module.exports = router;
