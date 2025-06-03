document.addEventListener('DOMContentLoaded', function() {
// waits for DOM to be loaded

// Function to load a component (eg: header or footer)
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${elementId}:`, error));
}
loadComponent('header', 'header.html');
loadComponent('footer', 'footer.html');

// Clears the form when "Clear" button is pressed
document.addEventListener("DOMContentLoaded", function () {
    const clearButton = document.querySelector("button[type='reset']");
    const form = document.querySelector(".contact-form");

    clearButton.addEventListener("click", function (e) {
        e.preventDefault();
        form.reset();
    });
});

// Checks if the confirmed password is the same as the original one
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  const password = this.password.value;
  const confirmPassword = this['confirm-password'].value;

  if (password !== confirmPassword) {
    e.preventDefault();
    alert('Passwords do not match.');
  }
});
});