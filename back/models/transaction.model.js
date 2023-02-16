import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    cashbackRate: Number
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;