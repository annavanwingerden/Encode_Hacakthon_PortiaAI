document.getElementById('submitButton').addEventListener('click', async () => {
    const topic = document.getElementById('topicInput').value;
    const loadingMessage = document.getElementById('loading');
    const resultDiv = document.getElementById('result');

    // Array of loading phrases
    const loadingPhrases = [
        "Researching...",
        "Looking for a YouTube Video...",
        "Summarising a YouTube Video...",
        "Adding a page to your Notion database..."
    ];

    let currentPhraseIndex = 0;

    // Function to update the loading message
    const updateLoadingMessage = () => {
        loadingMessage.innerText = loadingPhrases[currentPhraseIndex];
        currentPhraseIndex = (currentPhraseIndex + 1) % loadingPhrases.length; // Cycle through phrases
    };

    // Show loading message and start updating it
    loadingMessage.style.display = 'block';
    resultDiv.innerText = ''; // Clear previous results
    const loadingInterval = setInterval(updateLoadingMessage, 1000); // Update every second

    const response = await fetch('/run', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
    });

    // Stop updating the loading message
    clearInterval(loadingInterval);
    loadingMessage.style.display = 'none'; // Hide loading message

    if (response.ok) {
        const data = await response.json();
        resultDiv.innerText = "Notion page created successfully!";
    } else {
        resultDiv.innerText = 'Error fetching data.';
    }
});

function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
  }