import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  markUnavailableIfNone(): Promise<void>;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: [0, "Copies must be a positive number"] },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Instance Method
bookSchema.methods.markUnavailableIfNone = async function () {
  if (this.copies <= 0) {
    this.available = false;
    await this.save();
  }
};

// Pre-save middleware
bookSchema.pre("save", function (next) {
  if (this.copies <= 0) this.available = false;
  next();
});

const Book: Model<IBook> = mongoose.model("Book", bookSchema);
export default Book;
