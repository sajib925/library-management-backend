import { Router } from "express";
import { borrowBook, borrowedSummary } from "../controllers/borrowController";

const router = Router();

router.post("/borrow", borrowBook);
router.get("/borrow", borrowedSummary);

export default router;
