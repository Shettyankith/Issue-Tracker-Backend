const { body } =require("express-validator");

export const commentValidation = [
  body("body")
    .trim()
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({ max: 1000 })
    .withMessage("Comment must be less than 1000 characters"),
];