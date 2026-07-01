const userService = require('../services/userService');

async function listUsers(req, res) {
  const users = await userService.getAllUsers();
  res.json({ users });
}

module.exports = { listUsers };
