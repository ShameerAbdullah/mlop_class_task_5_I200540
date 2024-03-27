// frontend/script.js

document.addEventListener('DOMContentLoaded', function () {
    const url = window.location.href;

    // Check if the URL ends with "/entries"
    if (url.endsWith('/entries')) {
        fetchEntries();
    }

    const form = document.getElementById('inputForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();

        // Simple validation
        if (name === '' || email === '') {
            alert('Please fill in all fields');
            return;
        }

        // Send data to backend
        fetch('http://localhost:5000/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message); // Display success message
            form.reset(); // Reset the form

            // Check if the URL ends with "/entries"
            if (url.endsWith('/entries')) {
                fetchEntries(); // Fetch and display entries after submitting the form
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('An error occurred while submitting the form');
        });
    });

    // Function to fetch and display entries
    function fetchEntries() {
        fetch('http://localhost:5000/entries')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(entries => {
            const entriesList = document.getElementById('entriesList');
            entriesList.innerHTML = ''; // Clear previous entries
            entries.forEach(entry => {
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${entry.name}, Email: ${entry.email}`;
                entriesList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('An error occurred while fetching entries');
        });
    }
});
