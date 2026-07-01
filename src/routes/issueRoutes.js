const express = require('express');
const issueController = require('../controllers/issueController');
const authenticate = require('../middleware/auth');
const validate = require('../middleware/validate');
const asyncHandler = require('../utils/asyncHandler');
const {
  issueIdValidator,
  listIssuesValidator,
  createIssueValidator,
  updateIssueValidator,
} = require('../validators/issueValidators');

const router = express.Router();

router.use(authenticate);

router.get(
  '/',
  listIssuesValidator,
  validate,
  asyncHandler(issueController.listIssues)
);

router.post(
  '/',
  createIssueValidator,
  validate,
  asyncHandler(issueController.createIssue)
);

router.get(
  '/:id',
  issueIdValidator,
  validate,
  asyncHandler(issueController.getIssue)
);

router.put(
  '/:id',
  updateIssueValidator,
  validate,
  asyncHandler(issueController.updateIssue)
);

router.delete(
  '/:id',
  issueIdValidator,
  validate,
  asyncHandler(issueController.deleteIssue)
);

module.exports = router;
