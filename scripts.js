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