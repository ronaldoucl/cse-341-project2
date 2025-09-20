const mongodb = require("../data/database.js");
const ObjectId = require("mongodb").ObjectId;

/**
 * @desc    Retrieve all books from the database
 * @route   GET /books
 * @access  Public
 */
const getAll = async (req, res) => {
  //#swagger.tags=['Books']
  const result = await mongodb.getDatabase().collection("books").find();
  const books = await result.toArray();

  res.status(200).json(books);
};

/**
 * @desc    Retrieve a single book by its ID
 * @route   GET /books/:id
 * @access  Public
 */
const getSingle = async (req, res) => {
  //#swagger.tags=['Books']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID format." });
  }

  const bookId = new ObjectId(id);
  const book = await mongodb.getDatabase().collection("books").findOne({ _id: bookId });

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(200).json(book);
};

/**
 * @desc    Create a new book in the database
 * @route   POST /books
 * @access  Public
 */
const createBook = async (req, res) => {
  //#swager.tags=['Books']
  const book = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description ?? "",
    genre: req.body.genre ?? "",
    isbn: req.body.isbn ?? "",
    available: req.body.available ?? true,
  };

  const response = await mongodb
    .getDatabase()
    .collection("books")
    .insertOne(book);

  if (!response.acknowledged) {
    return res.status(500).json({ error: "Error creating book." });
  }

  res.status(201).json({ id: response.insertedId, ...book });
};

/**
 * @desc    Update an existing book by its ID
 * @route   PUT /books/:id
 * @access  Public
 */
const updateBook = async (req, res) => {
  //#swagger.tags=['Books']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID format." });
  }

  const bookId = new ObjectId(id);

  const updateFields = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    genre: req.body.genre,
    isbn: req.body.isbn,
    available: req.body.available,
  };

  Object.keys(updateFields).forEach(
    (key) => updateFields[key] === undefined && delete updateFields[key]
  );

  try {
    const response = await mongodb
      .getDatabase()
      .collection("books")
      .updateOne({ _id: bookId }, { $set: updateFields });

    if (response.matchedCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      updatedFields: updateFields,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Some error occurred" });
  }
};

/**
 * @desc    Delete a book by its ID
 * @route   DELETE /books/:id
 * @access  Public
 */
const deleteBook = async (req, res) => {
  //#swagger.tags=['Books']
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID format." });
  }

  const bookId = new ObjectId(id);

  try {
    const response = await mongodb.getDatabase().collection("books").deleteOne({ _id: bookId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Some error occurred" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook,
};