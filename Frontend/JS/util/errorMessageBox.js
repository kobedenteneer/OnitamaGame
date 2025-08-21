function errorMessage(message) {
  let errorMessage = document.createTextNode(message);
  let errorBox = document.getElementsByClassName("errorBox")[0];
  let errorText = document.getElementsByClassName("errorMessage")[0];
  if (errorText.hasChildNodes()) {
    errorText.removeChild(errorText.childNodes[0]);
  }
  errorText.appendChild(errorMessage);
  errorBox.style.display = "flex";
};

function hideErrorMessage() {
  let errorBox = document.getElementsByClassName("errorBox")[0];
  errorBox.style.display = "none";
};