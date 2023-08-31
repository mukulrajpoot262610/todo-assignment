/* eslint-disable import/prefer-default-export */
const router = require("./routes");
const DBConnect = require("./config/db");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

const corsOption = {
    credentials: true,
    origin: [
        "http://localhost:3000",
        "http://localhost:4000",
    ],
};

app.use(cors(corsOption));
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(router);
DBConnect();

// base
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello there" });
});

// listen
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
