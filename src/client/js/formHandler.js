// Replace checkForName with a function that checks the URL
import { checkForName } from "./nameChecker";

const serverURL = "https://localhost:8000/api";

const form = document.getElementById("urlForm");
form.addEventListener("submit", handleSubmit);

export function handleSubmit(event) {
  event.preventDefault();

  // Get the URL from the input field
  const formText = document.getElementById("name").value;

  // This is an example code that checks the submitted name. You may remove it from your code
  checkForName(formText);

  // Check if the URL is valid

  // If the URL is valid, send it to the server using the serverURL constant above
}

// Function to send data to the server

// Export the handleSubmit function
export { handleSubmit };
