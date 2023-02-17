import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import redisClient from "./service/redis.service.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import transactionRoutes from "./routes/transaction.route.js";

import db from "./config/db.config.js";

dotenv.config();
const app = express();

(async () => {
    try{
        await redisClient.connect();
    }
    catch(err){
        console.log(err);
    }
})();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        author: "Hiroki",
        app: "Expense"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);

app.use("/", userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server is running on port" + process.env.PORT + "...");
});