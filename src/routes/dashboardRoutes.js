const express =require("express");
const { authenticate } =require("../middleware/auth.js");
const { getDashboard } =require("../controllers/dashboardController.js");

const router = express.Router();

router.get("/", authenticate, getDashboard);

export default router;