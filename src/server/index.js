const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { menaCloudAnalysis } = require("./meaningCloudApi");

// Load environment variables from .env file
dotenv.config();

// Initialize Express Application
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../../dist")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../dist", "index.html"));
});

// POST Route to handle the URL analysis request
app.post("/getData", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ msg: "URL is required", code: 400 });
    }

    // Fetch sentiment analysis data from menaCloud API
    const analysisResult = await menaCloudAnalysis(url, process.env.API_KEY);
    const { object, msg, code } = analysisResult;

    // Process the API response
    if (code === 212 || code === 100) {
      return res.status(400).json({ object: null, msg, code });
    }

    return res.status(200).json({ object, msg, code });
  } catch (error) {
    console.error("Error in /getData route:", error);
    return res.status(500).json({ msg: "Internal Server Error", code: 500 });
  }
});

// Start the server
app.listen(8000, () => {
  console.log("Server is live on port 8000");
});
