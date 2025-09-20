const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");
const { createBookValidation, updateBookValidation, } = require("../validators/bookValidator");
const validate = require("../validators/validate");

router.get("/", booksController.getAll);
router.get("/:id", booksController.getSingle);
router.post("/", createBookValidation, validate, booksController.createBook);
router.put("/:id", updateBookValidation, validate, booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;