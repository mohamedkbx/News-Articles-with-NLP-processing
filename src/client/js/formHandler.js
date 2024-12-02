var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const cors = require("cors");

// cors middleware
app.use(cors());
//bodyParser
app.use(bodyParser.json());

console.log(__dirname);

app.use(express.static("dist"));
// Variables for url and api key

app.get("/", function (req, res) {
  res.send("This is the server API page, you may access its services via the client app.");
});

// POST Route

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
