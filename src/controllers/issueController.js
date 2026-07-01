const issueService = require('../services/issueService');

async function listIssues(req, res) {
  const filters = {};

  if (req.query.status) {
    filters.status = req.query.status;
  }

  if (req.query.assigned_to) {
    filters.assigned_to = Number(req.query.assigned_to);
  }

  const issues = await issueService.getAllIssues(filters);
  res.json({ issues });
}

async function getIssue(req, res) {
  const issue = await issueService.getIssueById(Number(req.params.id));
  res.json({ issue });
}

async function createIssue(req, res) {
  const issue = await issueService.createIssue(req.body, req.user.id);
  res.status(201).json({ issue });
}

async function updateIssue(req, res) {
  const issue = await issueService.updateIssue(Number(req.params.id), req.body);
  res.json({ issue });
}

async function deleteIssue(req, res) {
  await issueService.deleteIssue(Number(req.params.id));
  res.status(204).send();
}

module.exports = {
  listIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
};
