function validateUrl(urlString) {
  const urlPattern =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:%@&=+!*'(),]*)?(\?[a-zA-Z0-9-._~:%@&=+!*'(),]*)?(#[a-zA-Z0-9-._~:%@&=+!*'(),]*)?$/;
  return urlPattern.test(urlString);
}

function checkForName(inputText) {
  if (typeof inputText !== "string" || inputText.trim() === "") {
    return false;
  }
  return validateUrl(inputText);
}

export { checkForName };
