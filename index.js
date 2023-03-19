const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const allRoutes = require('./routes/all');
const companyRoutes = require('./routes/company');

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
app.use(morgan('common'));

app.use('/', allRoutes);
app.use('/company', companyRoutes);

app.get('/', (req, res) => {
    console.log("Welcome M0! You are not much away from success:)");
})

app.listen(8000, () => {
    console.log("Server up and running!");
})