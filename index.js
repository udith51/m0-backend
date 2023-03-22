const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const allRoutes = require('./routes/all');
const companyRoutes = require('./routes/company');
const contractorRoutes = require('./routes/contractor')

dotenv.config();
mongoose
    .connect(process.env.MONGO_TEMP_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use('/contractor', contractorRoutes);

app.get('/', (req, res) => {
    res.send("Welcome M0! You are not much away from success:)");
})

app.listen(8800, () => {
    console.log("Server up and running!");
})