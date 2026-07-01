const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { pool } = require('../config/db');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    // await pool.query('SELECT 1');
    res.json({ status: 'ok', message: 'API is running' });
  })
);

router.use('/auth', authRoutes);

module.exports = router;
