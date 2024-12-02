const apiBaseUrl = "https://api.meaningcloud.com/sentiment-2.1";

const fetchSentimentAnalysis = async (contentUrl, apiKey) => {
  // Create the endpoint with authentication
  const endpointUrl = `${apiBaseUrl}?key=${apiKey}&url=${contentUrl}&lang=en`;

  try {
    // Get data from the API
    const response = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the fetch request succeeded
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const responseData = await response.json();
    const { code, msg } = responseData.status;

    // Check if the API returned an error
    if (code === 100 || code === 212) {
      return generateErrorResponse(code, msg);
    }

    // On success, process and return the result
    return generateSuccessResponse(responseData);
  } catch (error) {
    console.error("Error in fetchSentimentAnalysis function:", error);
    return generateErrorResponse(500, "Internal Server Error");
  }
};

// Generate an error response object
const generateErrorResponse = (errorCode, errorMessage) => {
  return {
    result: null,
    message: errorMessage || "An error occurred",
    statusCode: errorCode,
  };
};

// Generate a success response object
const generateSuccessResponse = (apiData) => {
  const { agreement, confidence, score_tag, subjectivity, irony } = apiData;

  const result = {
    result: {
      sentiment: score_tag,
      agreement: agreement,
      subjectivity: subjectivity,
      confidence: confidence,
      irony: irony,
    },
    message: "Success",
    statusCode: 200,
  };

  return result;
};

// Export the function using CommonJS
module.exports = {
  fetchSentimentAnalysis,
};
