document.getElementById('submitButton').addEventListener('click', async () => {
    const topic = document.getElementById('topicInput').value;
    const loadingMessage = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');

    // Show loading message and progress bar
    loadingMessage.style.display = 'block';
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%'; // Reset progress bar

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
    const loadingInterval = setInterval(updateLoadingMessage, 1000); // Update every second

    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        if (progress < 100) {
            progress += 10; // Increment progress
            progressBar.style.width = progress + '%'; // Update progress bar width
        }
    }, 300); // Update every 300ms

    const response = await fetch('/run', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
    });

    // Stop updating the loading message and progress
    clearInterval(loadingInterval);
    clearInterval(progressInterval);
    loadingMessage.style.display = 'none'; // Hide loading message
    progressContainer.style.display = 'none'; // Hide progress bar

    if (response.ok) {
        const data = await response.json();
        resultDiv.innerText = "Notion page created successfully!";
    } else {
        resultDiv.innerText = 'Error fetching data.';
    }
});