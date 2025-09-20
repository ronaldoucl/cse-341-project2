const { body } = require("express-validator");

const createBookValidation = [
  body("title").isString().notEmpty().withMessage("Title is required and must be a string."),
  body("author").isString().notEmpty().withMessage("Author is required and must be a string."),
  body("description").optional().isString().withMessage("Description must be a string."),
  body("genre").optional().isString().withMessage("Genre must be a string."),
  body("isbn").optional().isString().withMessage("ISBN must be a string."),
  body("available").optional().isBoolean().withMessage("Available must be true or false."),
];

const updateBookValidation = [
  body("title").optional().isString(),
  body("author").optional().isString(),
  body("description").optional().isString(),
  body("genre").optional().isString(),
  body("isbn").optional().isString(),
  body("available").optional().isBoolean(),
];

module.exports = {
  createBookValidation,
  updateBookValidation,
};