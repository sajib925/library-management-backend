import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";
import borrowRoutes from "./routes/borrowRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Library Management API is running");
});

app.use("/api", bookRoutes);
app.use("/api", borrowRoutes);


app.use(errorHandler);

export default app;
