import mongoose, { Schema, Document } from "mongoose";
import Book, { IBook } from "./Book";

export interface IBorrow extends Document {
  book: mongoose.Types.ObjectId | IBook;
  quantity: number;
  dueDate: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: [1, "Quantity must be positive"] },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

// Pre-save middleware to check book availability and update copies
borrowSchema.pre("save", async function (next) {
  const book = await Book.findById(this.book);
  if (!book) {
    return next(new Error("Book not found"));
  }
  if (book.copies < this.quantity) {
    return next(new Error("Not enough copies available"));
  }
  book.copies -= this.quantity;
  await book.markUnavailableIfNone();
  await book.save();
  next();
});

const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);
export default Borrow;
