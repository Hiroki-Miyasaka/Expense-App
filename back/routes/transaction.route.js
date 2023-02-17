import express from "express";
import auth from "../middleware/auth.middleware.js";
import { createTransaction } from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/", auth, createTransaction);

export default router;