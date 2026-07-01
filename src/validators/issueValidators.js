const { body, param, query } = require('express-validator');

const STATUSES = ['open', 'in_progress', 'resolved', 'closed'];
const PRIORITIES = ['low', 'medium', 'high'];

const issueIdValidator = [
  param('id').isInt({ min: 1 }).withMessage('Invalid issue ID'),
];

const listIssuesValidator = [
  query('status')
    .optional()
    .isIn(STATUSES)
    .withMessage(`Status must be one of: ${STATUSES.join(', ')}`),
  query('assigned_to')
    .optional()
    .isInt({ min: 1 })
    .withMessage('assigned_to must be a valid user ID'),
];

const createIssueValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must be at most 255 characters'),
  body('description')
    .optional({ nullable: true })
    .isString()
    .withMessage('Description must be a string'),
  body('priority')
    .optional()
    .isIn(PRIORITIES)
    .withMessage(`Priority must be one of: ${PRIORITIES.join(', ')}`),
  body('assigned_to')
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage('assigned_to must be a valid user ID'),
];

const updateIssueValidator = [
  ...issueIdValidator,
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 255 })
    .withMessage('Title must be at most 255 characters'),
  body('description')
    .optional({ nullable: true })
    .isString()
    .withMessage('Description must be a string'),
  body('status')
    .optional()
    .isIn(STATUSES)
    .withMessage(`Status must be one of: ${STATUSES.join(', ')}`),
  body('priority')
    .optional()
    .isIn(PRIORITIES)
    .withMessage(`Priority must be one of: ${PRIORITIES.join(', ')}`),
  body('assigned_to')
    .optional({ nullable: true })
    .custom((value) => value === null || Number.isInteger(Number(value)))
    .withMessage('assigned_to must be a valid user ID or null'),
];

module.exports = {
  issueIdValidator,
  listIssuesValidator,
  createIssueValidator,
  updateIssueValidator,
};
