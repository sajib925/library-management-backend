import { Request, Response } from "express";
import Borrow from "../models/Borrow";
import Book from "../models/Book";

// Borrow a Book
export const borrowBook = async (req: Request, res: Response) => {
  try {
    const borrow = await Borrow.create(req.body);
    res.status(201).json({ success: true, message: "Book borrowed successfully", data: borrow });
  } catch (error) {
    res.status(400).json({ success: false, message: "Borrow failed", error });
  }
};

// Borrowed Books Summary using Aggregation
export const borrowedSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          book: { title: "$bookDetails.title", isbn: "$bookDetails.isbn" },
          totalQuantity: 1,
        },
      },
    ]);
    res.json({ success: true, message: "Borrowed books summary retrieved successfully", data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching summary", error });
  }
};
