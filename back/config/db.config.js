import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let db = mongoose.connect(process.env.MONGO_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB....");
}).catch((err) => {
    console.log("Error:", err);
});

export default db;