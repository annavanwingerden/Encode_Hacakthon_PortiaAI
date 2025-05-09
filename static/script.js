document.getElementById('submitButton').addEventListener('click', async (event) => {
    console.log("Button clicked!"); // Confirm the button click
    event.preventDefault(); // Prevent the default form submission behavior

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
        "Brewing some digital coffee...",
        "Researching...",
        "Doing a deep dive...",
        "Wading through the web...",
        "Skimming through articles...",
        "Asking the internet nicely...",
        "Hunting down the facts...",
        "Peeking behind digital curtains...",
        "Cross-referencing sources...",
        "Scanning the archives...",
        "Checking the latest findings...",
        "Looking under digital rocks...",
        "Tapping into expert knowledge...",
        "Sifting through data dust...",
        "Reading way too many tabs...",
        "Googling harder than ever...",
        "Searching every corner of the internet...",
        "Putting on research goggles...",
        "Reading so you don't have to...",
        "Finding needles in a digital haystack...",
        "Pulling together everything worth knowing...",
        "Assembling your answer puzzle...",
        "Piecing together insights...",
        "Whispering to the search engine...",
        "Looking for a YouTube video...",
        "Summarising a YouTube video...",
        "Adding a page to your Notion database...",
        "Scrolling through the internet haystack...",
        "Gathering some wisdom from the web...",
        "Dusting off the old data books...",
        "Summoning the API gods...",
        "Connecting the dots...",
        "Crunching some serious bytes...",
        "Just a sec, assembling the facts...",
        "Tuning into YouTube frequencies...",
        "Putting thoughts into Notion...",
        "Piecing together your answer...",
        "Typing very fast on a virtual keyboard...",
        "Loading the brainpower...",
        "Holding a quick meeting with the algorithms...",
        "Downloading the latest knowledge...",
        "Sharpening the pencils of the mind...",
        "Consulting the knowledge archives...",
        "Summoning helpful elves (digitally)...",
        "Synchronizing with Notion...",
        "Processing your smart request...",
        "Building a knowledge sandwich..."
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
            progress += 0.5; // Increment progress
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
    loadingMessage.style.display = 'none'; 
    progressContainer.style.display = 'none'; 

    console.log("Response status:", response.status);

    if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data); // Log the response data

        // Access the video URL and learning note from the nested structure
        const videoUrl = data.outputs.step_outputs["$video"].value; // Get the video URL
        const learningNote = data.outputs.step_outputs["$learning_note"].value; // Get the learning note

        // Display the result in the result div
        resultDiv.innerHTML = `
            <h2>Summary of your learning note:</h2>
            <p>${learningNote}</p>
            <h2>Video Link:</h2>
            <p><a href="${videoUrl}" target="_blank">${videoUrl}</a></p>
        `;
    } else {
        const errorData = await response.text();
        console.log("Error response body:", errorData);
        resultDiv.innerHTML = `
            <h2>Summary of your learning note:</h2>
            <p>${learningNote}</p>
            <h2>Video Link:</h2>
            <p><a href="${videoUrl}" target="_blank">${videoUrl}</a></p>
        `;
    }
});