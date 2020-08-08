const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path')

//config
const mongoURL = require("./config/config").MONGO_URL;
const mongoURL_PROD = require("./config/config").MONGO_URL_PROD;

//models
const DummyUser = require("./models/DummyUserModel");
const User = require("./models/UserModal");

//routes
const dummyRoute = require("./routes/DummyUserRoute")(DummyUser);
const user = require("./routes/UserRoute")(User);

//database connection

const mongoose = require("mongoose");
const db = mongoose
  .connect(process.env.MONGODB_URL || mongoURL_PROD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//static files
// app.use(express.static("uploads"));

//body-parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router prefix
app.use("/api/v1", dummyRoute);
app.use("/api/v1/auth", user);

const port = process.env.PORT || 5000;

// production
if( process.env.NODE_ENV == 'production') {
  app.use(express.static('build'))

  app.get('*', (req, res)=>{
    res.sendFile(path.join('build', 'index.html'))
  })

}

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
