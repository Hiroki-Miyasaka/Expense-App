import express from "express";
import auth from "../middleware/auth.middleware.js";
import { getTransaction, createTransaction, updateTransaction, deleteTransaction } from "../controllers/transaction.controller.js";

const router = express.Router();

router.get("/:id", auth, getTransaction);
router.post("/", auth, createTransaction);
router.put("/:id", auth, updateTransaction);
router.delete("/:id", auth, deleteTransaction);

export default router;