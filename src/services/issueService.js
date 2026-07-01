const { pool } = require('../config/db');
const AppError = require('../utils/AppError');
const authService = require('./authService');

const ISSUE_SELECT = `
  SELECT
    i.id,
    i.title,
    i.description,
    i.status,
    i.priority,
    i.created_by,
    i.assigned_to,
    i.created_at,
    i.updated_at,
    creator.name AS creator_name,
    creator.email AS creator_email,
    assignee.name AS assignee_name,
    assignee.email AS assignee_email
  FROM issues i
  JOIN users creator ON i.created_by = creator.id
  LEFT JOIN users assignee ON i.assigned_to = assignee.id
`;

async function validateAssignee(userId) {
  await authService.getUserById(userId);
}

async function getAllIssues(filters = {}) {
  const conditions = [];
  const values = [];

  if (filters.status) {
    conditions.push('i.status = ?');
    values.push(filters.status);
  }

  if (filters.assigned_to) {
    conditions.push('i.assigned_to = ?');
    values.push(filters.assigned_to);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const [rows] = await pool.query(
    `${ISSUE_SELECT} ${whereClause} ORDER BY i.updated_at DESC`,
    values
  );

  return rows;
}

async function getIssueById(id) {
  const [rows] = await pool.query(`${ISSUE_SELECT} WHERE i.id = ?`, [id]);

  if (rows.length === 0) {
    throw new AppError('Issue not found', 404);
  }

  return rows[0];
}

async function createIssue(data, createdBy) {
  const { title, description, priority, assigned_to } = data;

  if (assigned_to) {
    await validateAssignee(assigned_to);
  }

  const [result] = await pool.query(
    `INSERT INTO issues (title, description, priority, created_by, assigned_to)
     VALUES (?, ?, ?, ?, ?)`,
    [title, description || null, priority || 'medium', createdBy, assigned_to || null]
  );

  return getIssueById(result.insertId);
}

async function updateIssue(id, data) {
  await getIssueById(id);

  if (data.assigned_to !== undefined && data.assigned_to !== null) {
    await validateAssignee(data.assigned_to);
  }

  const allowedFields = ['title', 'description', 'status', 'priority', 'assigned_to'];
  const fields = [];
  const values = [];

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      fields.push(`${field} = ?`);
      values.push(data[field]);
    }
  }

  if (fields.length === 0) {
    throw new AppError('No fields to update', 400);
  }

  values.push(id);
  await pool.query(`UPDATE issues SET ${fields.join(', ')} WHERE id = ?`, values);

  return getIssueById(id);
}

async function deleteIssue(id) {
  const [result] = await pool.query('DELETE FROM issues WHERE id = ?', [id]);

  if (result.affectedRows === 0) {
    throw new AppError('Issue not found', 404);
  }
}

module.exports = {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
};
