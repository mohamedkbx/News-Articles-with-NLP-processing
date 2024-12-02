const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { fetchSentimentAnalysis } = require("./meaningCloudApi");

dotenv.config();

// Setup Express App
const app = express();

// cors middleware
app.use(cors());
// body-parser middleware
app.use(bodyParser.json());
// make the dist folder the clint side
app.use(express.static(path.join(__dirname, "dist")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// POST Route to handle URL processing
app.post("/getData", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "url Required", statusCode: 400 });
    }

    // Fetch sentiment analysis data from the MeaningCloud API
    const sentimentResult = await fetchSentimentAnalysis(url, process.env.API_KEY);
    const { result, message, statusCode } = sentimentResult;

    // Handle API response errors
    if (statusCode === 212 || statusCode === 100) {
      return res.status(400).json({ result: null, message, statusCode });
    }

    // Return successful sentiment analysis data
    return res.status(200).json({ result, message, statusCode });
  } catch (error) {
    console.error("Error in /getData route:", error);
    return res.status(500).json({ message: "Internal Server Error", statusCode: 500 });
  }
});

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
