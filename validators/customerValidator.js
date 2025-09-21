const { body } = require("express-validator");

/**
 * Validation rules for creating a new customer
 */
const createCustomerValidation = [
  body("firstName")
    .exists({ checkFalsy: true }).withMessage("First name is required.")
    .isString().withMessage("First name must be a string.")
    .isLength({ min: 2, max: 50 }).withMessage("First name must be between 2 and 50 characters."),

  body("lastName")
    .exists({ checkFalsy: true }).withMessage("Last name is required.")
    .isString().withMessage("Last name must be a string.")
    .isLength({ min: 2, max: 50 }).withMessage("Last name must be between 2 and 50 characters."),

  body("email")
    .exists({ checkFalsy: true }).withMessage("Email is required.")
    .isEmail().withMessage("Must be a valid email address.")
    .normalizeEmail(),

  body("phone")
    .optional()
    .matches(/^\+?[0-9\s\-]{7,15}$/).withMessage("Phone must be 7–15 digits and may include '+', spaces, or dashes."),

  body("address")
    .optional()
    .isString().withMessage("Address must be a string.")
    .isLength({ min: 5, max: 100 }).withMessage("Address must be between 5 and 100 characters."),

  body("active")
    .optional()
    .isBoolean().withMessage("Active must be true or false.")
    .toBoolean()
    .default(true)
];

/**
 * Validation rules for updating an existing customer
 */
const updateCustomerValidation = [
  body("firstName")
    .optional()
    .isString().withMessage("First name must be a string.")
    .isLength({ min: 2, max: 50 }).withMessage("First name must be between 2 and 50 characters."),

  body("lastName")
    .optional()
    .isString().withMessage("Last name must be a string.")
    .isLength({ min: 2, max: 50 }).withMessage("Last name must be between 2 and 50 characters."),

  body("email")
    .optional()
    .isEmail().withMessage("Must be a valid email address.")
    .normalizeEmail(),

  body("phone")
    .optional()
    .matches(/^\+?[0-9\s\-]{7,15}$/).withMessage("Phone must be 7–15 digits and may include '+', spaces, or dashes."),

  body("address")
    .optional()
    .isString().withMessage("Address must be a string.")
    .isLength({ min: 5, max: 100 }).withMessage("Address must be between 5 and 100 characters."),

  body("active")
    .optional()
    .isBoolean().withMessage("Active must be true or false.")
    .toBoolean()
];

module.exports = {
  createCustomerValidation,
  updateCustomerValidation
};
