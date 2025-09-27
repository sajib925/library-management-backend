"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/library";
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log("MongoDB connected");
    app_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((err) => console.error("MongoDB connection error:", err));
