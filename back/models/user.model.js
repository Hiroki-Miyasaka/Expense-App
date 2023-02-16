import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    income: {
        type: Number,
        default: 0
    },
    transaction: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
        }
    ]
});

const User = mongoose.model("User", userSchema);

export default User;