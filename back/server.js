import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.config.js";


dotenv.config();
const app = express();

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

app.listen(process.env.PORT, () => {
    console.log("Server is running on port" + process.env.PORT + "...");
});