const pool =require("../config/db.js");

export const getDashboardStats = async (userId) => {
  const [[total]] = await pool.execute(
    "SELECT COUNT(*) AS totalIssues FROM issues"
  );

  const [[open]] = await pool.execute(
    "SELECT COUNT(*) AS open FROM issues WHERE status='Open'"
  );

  const [[progress]] = await pool.execute(
    "SELECT COUNT(*) AS inProgress FROM issues WHERE status='In Progress'"
  );

  const [[closed]] = await pool.execute(
    "SELECT COUNT(*) AS closed FROM issues WHERE status='Closed'"
  );

  const [[assigned]] = await pool.execute(
    `SELECT COUNT(*) AS myAssignedIssues
     FROM issues
     WHERE assigned_to=?`,
    [userId]
  );

  return {
    totalIssues: total.totalIssues,
    open: open.open,
    inProgress: progress.inProgress,
    closed: closed.closed,
    myAssignedIssues: assigned.myAssignedIssues,
  };
};