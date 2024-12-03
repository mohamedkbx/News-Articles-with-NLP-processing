/**
 * @jest-environment jsdom
 */
import { isValidUrl, handleFormSubmission } from "../src/client/js/formHandler"; // Adjust the import path if necessary

// Mock DOM elements for the test
document.body.innerHTML = `
  <form id="urlForm">
    <input id="urlInput" />
    <button id="submitButton">Submit</button>
    <div id="errorMsg" class="hidden"></div>
    <div id="results"></div>
  </form>
`;

describe("Form Submission Tests", () => {
  // Test the isValidUrl function
  test("should return true for a valid URL", () => {
    const validUrl = "http://example.com";
    expect(isValidUrl(validUrl)).toBe(true);
  });

  test("should return false for an invalid URL", () => {
    const invalidUrl = "not-a-url";
    expect(isValidUrl(invalidUrl)).toBe(false);
  });

  // Test the form submission behavior
  test("should show error message if URL is empty", async () => {
    const urlInput = document.getElementById("urlInput");
    urlInput.value = ""; // Simulate empty URL input

    const form = document.getElementById("urlForm");
    const errorMsg = document.getElementById("errorMsg");
    const submitButton = document.getElementById("submitButton");

    // Mock handleFormSubmission to prevent actual API call
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      handleFormSubmission(event);
    });

    await form.dispatchEvent(new Event("submit")); // Trigger the submit event

    expect(errorMsg.classList.contains("hidden")).toBe(false); // Ensure error is visible
    expect(errorMsg.innerHTML).toBe("The URL field cannot be left empty!"); // Check error message
    expect(submitButton.disabled).toBe(false); // Ensure the submit button is re-enabled
  });
});
