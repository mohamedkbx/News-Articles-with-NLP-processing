const { checkForName } = require("../src/client/js/nameChecker");

describe("URL Validation Tests", () => {
  it("should return false for non-URL text", () => {
    expect(checkForName("hello world")).toBe(false);
  });

  it("should return false for email links", () => {
    expect(checkForName("mailto:mohamed.khaled160600@ci.menofia.edu.eg")).toBe(false);
  });

  it("should return true for a valid web URL", () => {
    expect(checkForName("https://www.google.com")).toBe(true);
  });

  it("should return false for an invalid URL format", () => {
    expect(checkForName("http://google..com")).toBe(false);
  });
});
