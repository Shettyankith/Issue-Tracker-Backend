const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const authRoutes = require('./authRoutes');
const issueRoutes = require('./issueRoutes');
const userRoutes = require('./userRoutes');
const { pool } = require('../config/db');
const commentRoutes = require('./commentRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', message: 'API is running' });
  })
);

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/issues', issueRoutes);
router.use('/comments', commentRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
