const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");


dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('db connected'))
    .catch((err) => {
        console.log(err)
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/", authRoute);
app.use("/api/user", userRoute);


app.listen(process.env.PORT || 5002, () => console.log(`App listening on port ${process.env.PORT}!`))
