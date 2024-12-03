const sentimentApiUrl = "https://api.meaningcloud.com/sentiment-2.1";

const menaCloudAnalysis = async (url, key) => {
  // Construct the API request URL
  const requestUrl = `${sentimentApiUrl}?key=${key}&url=${url}&lang=en`;

  try {
    // Send request to the MeaningCloud API
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const responseData = await response.json();
    const { code, msg } = responseData.status;

    console.log(code); // Debugging: log status code

    // Handle API response errors
    if (code === 100 || code === 212) {
      return handleError(code, msg);
    }

    // Process and return successful data
    return handleSuccess(responseData);
  } catch (error) {
    console.error("Error in menaCloudAnalysis function:", error);
    return handleError(500, "Internal Server Error");
  }
};

// Handle API error responses
const handleError = (code, msg) => {
  return {
    object: null,
    msg: msg || "An error occurred",
    code: code,
  };
};

// Process and structure the successful API response
const handleSuccess = (data) => {
  const { agreement, confidence, score_tag, subjectivity, irony } = data;

  const result = {
    object: {
      sentiment: score_tag,
      agreement: agreement,
      subjectivity: subjectivity,
      confidence: confidence,
      irony: irony,
    },
    msg: "Success",
    code: 200,
  };

  return result;
};

module.exports = {
  menaCloudAnalysis,
};
