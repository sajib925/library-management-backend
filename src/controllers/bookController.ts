import { Request, Response } from "express";
import Book from "../models/Book";

// Create Book
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, message: "Book created successfully", data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: "Validation failed", error });
  }
};

// Get All Books with Filtering & Sorting
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = "createdAt", sort = "asc", limit = 10 } = req.query;
    const query: any = {};
    if (filter) query.genre = filter;

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
      .limit(Number(limit));

    res.json({ success: true, message: "Books retrieved successfully", data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching books", error });
  }
};

// Get Book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ success: false, message: "Book not found", data: null });
    res.json({ success: true, message: "Book retrieved successfully", data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching book", error });
  }
};

// Update Book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ success: false, message: "Book not found", data: null });
    res.json({ success: true, message: "Book updated successfully", data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: "Validation failed", error });
  }
};

// Delete Book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) return res.status(404).json({ success: false, message: "Book not found", data: null });
    res.json({ success: true, message: "Book deleted successfully", data: null });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting book", error });
  }
};
