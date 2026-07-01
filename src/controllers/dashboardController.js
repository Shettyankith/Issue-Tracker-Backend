const dashboardService =require("../services/dashboardService.js");

export const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const stats = await dashboardService.getDashboardStats(userId);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err) {
    next(err);
  }
};