const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new AppError('Validation failed', 400);
    err.details = errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
    }));
    return next(err);
  }
  next();
}

module.exports = validate;
