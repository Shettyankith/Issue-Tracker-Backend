const dashboardService =require("../services/dashboardService.js");

const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const stats = await dashboardService.getDashboardStats(userId);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err) {
    console.log("Error thrown is : ",err)
    next(err);
  }
};

module.exports={getDashboard};