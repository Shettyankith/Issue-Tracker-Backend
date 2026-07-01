const {pool} = require("../config/db.js");

const createComment = async (issueId, userId, body) => {
  const [result] = await pool.execute(
    `INSERT INTO comments (issue_id, user_id, body)
     VALUES (?, ?, ?)`,
    [issueId, userId, body]
  );

  return result.insertId;
};

const getCommentsByIssue = async (issueId) => {
  const [rows] = await pool.execute(
    `SELECT
        c.id,
        c.body,
        c.created_at,
        u.id AS user_id,
        u.name
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.issue_id = ?
     ORDER BY c.created_at ASC`,
    [issueId]
  );

  return rows;
};

const issueExists = async (issueId) => {
  const [rows] = await pool.execute(
    "SELECT id FROM issues WHERE id = ?",
    [issueId]
  );

  return rows.length > 0;
};

module.exports={getCommentsByIssue,issueExists,createComment};