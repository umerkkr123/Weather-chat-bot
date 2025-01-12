const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { weatherRouter } = require("./route/weather");
require('dotenv').config();
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
  }));


app.use(bodyParser.json());
app.use(express.json());

app.post('/webhook', weatherRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});