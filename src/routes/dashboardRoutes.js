const express =require("express");
const authenticate = require('../middleware/auth');
const { getDashboard } =require("../controllers/dashboardController.js");

const router = express.Router();

router.get("/stats", authenticate, getDashboard);

module.exports = router;