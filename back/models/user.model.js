import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    income: Number,
    transaction: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
        }
    ]
});

const User = mongoose.model("User", userSchema);

export default User;