const { body } = require("express-validator");

const createCustomerValidation = [
  body("firstName").isString().notEmpty().withMessage("First name is required."),
  body("lastName").isString().notEmpty().withMessage("Last name is required."),
  body("email").isEmail().withMessage("A valid email is required."),
  body("phone").optional().isString(),
  body("address").optional().isString(),
  body("active").optional().isBoolean(),
];

const updateCustomerValidation = [
  body("firstName").optional().isString(),
  body("lastName").optional().isString(),
  body("email").optional().isEmail(),
  body("phone").optional().isString(),
  body("address").optional().isString(),
  body("active").optional().isBoolean(),
];

module.exports = {
  createCustomerValidation,
  updateCustomerValidation,
};
