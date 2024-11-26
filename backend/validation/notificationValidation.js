const { body, validationResult } = require("express-validator");

const notificationCreateValidation = [
  body("heading").not().isEmpty().withMessage("Heading is required"),
  body("message").not().isEmpty().withMessage("Message is required"),
  body("type")
    .isString()
    .withMessage(" type must be a string")
    .not()
    .isEmpty()
    .withMessage("Type is required")
    .isIn(["user", "rice"])
    .withMessage("type must be 'user' or 'rice'"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = { validate, notificationCreateValidation };
