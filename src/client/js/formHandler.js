import { checkForName } from "./nameChecker"; // If you wish to use a custom validateUrl function

// If working in Udacity workspace, adjust this to your Server API URL, for example: `https://example.udacity-student-workspaces.com/api`
// const apiURL = 'https://example.udacity-student-workspaces.com/api'
const apiURL = "https://localhost:8000/api";

const formElement = document.getElementById("urlForm");
const errorDisplay = document.getElementById("errorMessage");
const submitBtn = document.getElementById("submitButton");
const urlInput = document.getElementById("url");

formElement.addEventListener("submit", handleFormSubmission);

async function handleFormSubmission(event) {
  event.preventDefault();

  // Disable the button to prevent multiple submissions
  toggleButtonState(false, "Processing...");

  // Retrieve the URL from the input field
  const urlValue = urlInput.value.trim(); // Remove extra spaces from the URL

  // Ensure the URL input is not empty
  if (urlValue === "") {
    showErrorMessages("The URL field cannot be left empty!");
    toggleButtonState(true, "Submit");
    return;
  }

  // Validate the format of the URL using a built-in or custom function
  const isUrlValid = isValidUrl(urlValue); // You can use isValidUrl or validateUrl as per preference

  if (!isUrlValid) {
    showErrorMessages("Please enter a valid URL!");
    toggleButtonState(true, "Submit");
    return;
  } else {
    // If the URL is valid, proceed with sending it to the server
    hideErrorMessages();

    const requestBody = { url: urlValue };
    try {
      // Sending the URL data to the server
      const response = await fetch("http://localhost:8000/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const { object, msg, code } = await response.json();
      if (code === 200) {
        hideErrorMessages();

        let resultText = `Agreement: ${object.agreement}<br> <br>`;
        resultText += `Subjectivity: ${object.subjectivity}<br> <br>`;
        resultText += `Confidence: ${object.confidence}<br> <br>`;
        resultText += `Irony: ${object.irony}<br> <br>`;
        resultText += `Score Tag: ${object.score_tag}`;

        document.getElementById("results").innerHTML = resultText;
      } else if (code !== 200) {
        showErrorMessages(msg);
      }
    } catch (error) {
      console.error("Error updating UI:", error);
    } finally {
      // Re-enable the submit button once the process finishes
      toggleButtonState(true, "Submit");
    }
  }
}

function showErrorMessages(message = "") {
  if (message !== "") {
    errorDisplay.innerHTML = message;
  }
  errorDisplay.classList.remove("hidden");
}

function hideErrorMessages() {
  errorDisplay.classList.add("hidden");
  errorDisplay.innerHTML = ""; // Clear any previous error messages
}

function toggleButtonState(isEnabled, label) {
  submitBtn.disabled = !isEnabled; // Enable or disable the button
  submitBtn.innerText = label; // Change the button text
}

function isValidUrl(urlString) {
  try {
    new URL(urlString); // Attempt to create a URL object
    return true; // If successful, it's a valid URL
  } catch (_) {
    return false; // If it fails, it's not a valid URL
  }
}

// Export the handleFormSubmission function
export { handleFormSubmission };
