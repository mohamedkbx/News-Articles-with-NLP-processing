import { checkForName } from "./nameChecker"; // If you wish to use a custom validateUrl function

// If working in Udacity workspace, adjust this to your Server API URL, for example: `https://example.udacity-student-workspaces.com/api`
// const apiURL = 'https://example.udacity-student-workspaces.com/api'
const apiEndPoint = "http://localhost:8000/getData";

const formElement = document.getElementById("urlForm");
const errorDisplay = document.getElementById("errorMsg");
const submitBtn = document.getElementById("submitButton");
const urlElemntInput = document.getElementById("urlInput");

formElement.addEventListener("submit", handleFormSubmission);

async function handleFormSubmission(event) {
  event.preventDefault();

  // Disable the button to prevent multiple submissions
  toggleButtonState(false, "Loading..");

  // Retrieve the URL from the input field
  const urlValue = urlElemntInput.value.trim(); // Remove extra spaces from the URL

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
      const response = await fetch(apiEndPoint, {
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

        let resultConatainer = `
        <div class="result-item">
          <strong>Agreement:</strong> ${object.agreement}
        </div>
        <div class="result-item">
          <strong>Subjectivity:</strong> ${object.subjectivity}
        </div>
        <div class="result-item">
          <strong>Confidence:</strong> ${object.confidence}
        </div>
        <div class="result-item">
          <strong>Irony:</strong> ${object.irony}
        </div>
        
      `;

        document.getElementById("results").innerHTML = resultConatainer;
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

export function isValidUrl(urlString) {
  try {
    new URL(urlString); // Attempt to create a URL object
    return true; // If successful, it's a valid URL
  } catch (_) {
    return false; // If it fails, it's not a valid URL
  }
}

// Export the handleFormSubmission function
export { handleFormSubmission };
