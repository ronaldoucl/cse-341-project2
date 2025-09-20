const mongodb = require("../data/database.js");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swager.tags=['Books']
    const result = await mongodb.getDatabase().collection("books").find();
    result.toArray().then((books) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(books);
    });
};

const getSingle = async (req, res) => {
  //#swager.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection("books").find({_id: bookId});
    result.toArray().then((books) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(books[0]);
    });
};


const createBook = async (req, res) => {
  try {
    if (!req.body || !req.body.title || !req.body.author) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const book = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
      isbn: req.body.isbn,
      available: req.body.available ?? true
    };

    const response = await mongodb
      .getDatabase()
      .collection("books")
      .insertOne(book);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId, ...book });
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while creating the book.");
    }
  } catch (err) {
    console.error("❌ Error in createBook:", err);
    res.status(500).json({ message: err.message });
  }
};


const updateBook = async (req, res) => {
  //#swager.tags=['Books']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid book ID format." });
    }

    const bookId = new ObjectId(id);

    const book = {
      author: req.body.author,
      title: req.body.title,
      description: req.body.title,
      genre: req.body.genre,
      isbn: req.body.isbn,
      available: req.body.available,
    };

    const response = await mongodb.getDatabase().collection("books").replaceOne({ _id: bookId }, book);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Book updated successfully", book });
    } else {
      res.status(404).json({ error: "Book not found or no changes made" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || "Some error occurred" });
  }
};

const deleteBook = async (req, res) => {
  //#swager.tags=['Books']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid book ID format." });
    }

    const bookId = new ObjectId(id);

    const response = await mongodb.getDatabase().collection("books").deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || "Some error occurred" });
  }
};

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
}