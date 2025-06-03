document.addEventListener('DOMContentLoaded', function() {
    // Function to load a component (eg: header or footer)
    function loadComponent(elementId, filePath, callback = null) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (callback) {
                    callback(); // Execute the callback after content is loaded
                }
            })
            .catch(error => console.error(`Error loading ${elementId}:`, error));
    }

    // Load header and then initialize dark mode functionality
    loadComponent('header', 'header.html', function() {
        const toggleBtn = document.getElementById("toggleBtn");
        const body = document.body;
        const themeKey = 'websiteTheme';

        if (toggleBtn) { 
            function applyTheme(theme) {
                if (theme === 'dark') {
                    body.classList.remove("light-mode"); 
                    toggleBtn.textContent = "☀️"; 
                } else { 
                    body.classList.add("light-mode"); 
                    toggleBtn.textContent = "🌑";
                }
                localStorage.setItem(themeKey, theme);
            }

            const savedTheme = localStorage.getItem(themeKey);
            if (savedTheme) {
                applyTheme(savedTheme);
            } else {
                applyTheme('dark');
            }

            toggleBtn.addEventListener("click", () => {
                if (body.classList.contains("light-mode")) {
                    applyTheme('dark');
                } else {
                    applyTheme('light');
                }
            });
        } else {
            console.warn("toggleBtn not found after header loaded. Check header.html ID.");
        }
    });

    loadComponent('footer', 'footer.html'); 

    // Clears the form when "Clear" button is pressed
    const clearButton = document.querySelector("button[type='reset']");
    const form = document.querySelector(".contact-form");

    if (clearButton && form) { // Check if elements exist before adding listener
        clearButton.addEventListener("click", function(e) {
            e.preventDefault();
            form.reset();
        });
    }

    // Checks if the confirmed password is the same as the original one 
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) { // Check if form exists
        contactForm.addEventListener('submit', function(e) {
            const passwordField = this.password;
            const confirmPasswordField = this['confirm-password'];

            if (passwordField && confirmPasswordField && passwordField.value !== confirmPasswordField.value) {
                e.preventDefault();
                alert('Passwords do not match.');
            }
        });
    }
});