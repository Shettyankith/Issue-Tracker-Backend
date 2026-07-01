const express =require("express");
const { validationResult } =require("express-validator");
const {
  addComment,
  getComments,
} =require("../controllers/commentController.js");
const { commentValidation } =require("../validators/commentValidator.js");
const authenticate = require('../middleware/auth');
const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

router.post(
  "/:issueId",
  authenticate,
  commentValidation,
  validate,
  addComment
);

router.get(
  "/:issueId",
  authenticate,
  getComments
);

module.exports = router;