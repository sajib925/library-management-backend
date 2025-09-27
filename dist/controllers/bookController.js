"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const Book_1 = __importDefault(require("../models/Book"));
// Create Book
const createBook = async (req, res) => {
    try {
        const book = await Book_1.default.create(req.body);
        res.status(201).json({ success: true, message: "Book created successfully", data: book });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Validation failed", error });
    }
};
exports.createBook = createBook;
// Get All Books with Filtering & Sorting
const getAllBooks = async (req, res) => {
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = 10 } = req.query;
        const query = {};
        if (filter)
            query.genre = filter;
        const books = await Book_1.default.find(query)
            .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
            .limit(Number(limit));
        res.json({ success: true, message: "Books retrieved successfully", data: books });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error fetching books", error });
    }
};
exports.getAllBooks = getAllBooks;
// Get Book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book_1.default.findById(req.params.bookId);
        if (!book)
            return res.status(404).json({ success: false, message: "Book not found", data: null });
        res.json({ success: true, message: "Book retrieved successfully", data: book });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error fetching book", error });
    }
};
exports.getBookById = getBookById;
// Update Book
const updateBook = async (req, res) => {
    try {
        const book = await Book_1.default.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
        if (!book)
            return res.status(404).json({ success: false, message: "Book not found", data: null });
        res.json({ success: true, message: "Book updated successfully", data: book });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Validation failed", error });
    }
};
exports.updateBook = updateBook;
// Delete Book
const deleteBook = async (req, res) => {
    try {
        const book = await Book_1.default.findByIdAndDelete(req.params.bookId);
        if (!book)
            return res.status(404).json({ success: false, message: "Book not found", data: null });
        res.json({ success: true, message: "Book deleted successfully", data: null });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error deleting book", error });
    }
};
exports.deleteBook = deleteBook;
