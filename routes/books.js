const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");
const { createBookValidation, updateBookValidation, } = require("../validators/bookValidator");
const validate = require("../validators/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", booksController.getAll);
router.get("/:id", booksController.getSingle);
router.post("/", isAuthenticated, createBookValidation, validate, booksController.createBook);
router.put("/:id", isAuthenticated, updateBookValidation, validate, booksController.updateBook);
router.delete("/:id", isAuthenticated, booksController.deleteBook);

module.exports = router;