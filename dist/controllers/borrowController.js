"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowedSummary = exports.borrowBook = void 0;
const Borrow_1 = __importDefault(require("../models/Borrow"));
// Borrow a Book
const borrowBook = async (req, res) => {
    try {
        const borrow = await Borrow_1.default.create(req.body);
        res.status(201).json({ success: true, message: "Book borrowed successfully", data: borrow });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Borrow failed", error });
    }
};
exports.borrowBook = borrowBook;
// Borrowed Books Summary using Aggregation
const borrowedSummary = async (req, res) => {
    try {
        const summary = await Borrow_1.default.aggregate([
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error fetching summary", error });
    }
};
exports.borrowedSummary = borrowedSummary;
