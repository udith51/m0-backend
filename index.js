const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

dotenv.config();
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected with database");
    })
    .catch((e) => {
        console.log(e);
    })
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan('common'))

app.get('/', (req, res) => {
    res.send("Welcome M0");
})

app.listen(8000, () => {
    console.log("Server up and running!");
})