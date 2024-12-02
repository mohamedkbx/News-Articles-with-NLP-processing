import { checkForName } from "./nameChecker";

// URL for the server API (localhost for local testing)
const apiUrl = "https://localhost:8000/api";
//select elements
// Get the form element, error message element, submit button, and URL input field
const formElement = document.getElementById("urlForm");
const errorMessageElement = document.getElementById("errorMessage");
const submitButtonElement = document.getElementById("submitButton");
const urlInputElement = document.getElementById("url");
// event Listeners
formElement.addEventListener("submit", handleFormSubmit);

// Form submit handler
async function handleFormSubmit(event) {
  event.preventDefault();

  // Disable the submit button to prevent multiple clicks
  setButtonState(false, "Loading...");

  // Get the URL value from the input field and remove extra spaces
  const inputUrl = urlInputElement.value.trim();

  // If the input URL is empty, show an error
  if (inputUrl === "") {
    showError("The URL field cannot be empty!");
    setButtonState(true, "Submit");
    return;
  }

  // Validate the URL format
  const isValid = isValidUrl(inputUrl); // You can use `checkUrl` if you have a custom function

  if (!isValid) {
    showError("Please insert a valid URL!");
    setButtonState(true, "Submit");
    return;
  } else {
    // If the URL is valid, hide any previous errors
    hideError();

    const requestBody = { url: inputUrl };

    try {
      // Send the URL to the server for sentiment analysis
      const response = await fetch("http://localhost:8000/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const { result, message, statusCode } = await response.json();

      // If the API returns successful status code (200), display the sentiment data
      if (statusCode === 200) {
        hideError();

        let resultText = `Agreement: ${result.agreement}<br><br>`;
        resultText += `Subjectivity: ${result.subjectivity}<br><br>`;
        resultText += `Confidence: ${result.confidence}<br><br>`;
        resultText += `Irony: ${result.irony}<br><br>`;
        resultText += `Score Tag: ${result.score_tag}`;

        document.getElementById("results").innerHTML = resultText;
      } else {
        // If the status code is not 200, display the error message
        showError(message);
      }
    } catch (error) {
      console.error("Error updating UI:", error);
    } finally {
      // Re-enable the button after the process is complete
      setButtonState(true, "Submit");
    }
  }
}

// Function to show error messages
function showError(errorText = "") {
  if (errorText !== "") {
    errorMessageElement.innerHTML = errorText;
  }
  errorMessageElement.classList.remove("hidden");
}

// Function to hide error messages
function hideError() {
  errorMessageElement.classList.add("hidden");
  errorMessageElement.innerHTML = ""; // Clear previous error message
}

// Function to control the submit button state (enabled/disabled)
function setButtonState(enabled, buttonText) {
  submitButtonElement.disabled = !enabled;
  submitButtonElement.innerText = buttonText;
}

// Function to check if the provided string is a valid URL
function isValidUrl(urlString) {
  try {
    new URL(urlString); // Attempt to create a URL object
    return true; // If successful, it's a valid URL
  } catch (_) {
    return false; // If an error is thrown, it's not a valid URL
  }
}

// Export the handleFormSubmit function
export { handleFormSubmit };
