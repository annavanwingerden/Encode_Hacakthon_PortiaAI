document.getElementById('submitButton').addEventListener('click', async () => {
    const topic = document.getElementById('topicInput').value;
    const response = await fetch('/run', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('result').innerText = JSON.stringify(data, null, 2);
    } else {
        document.getElementById('result').innerText = 'Error fetching data.';
    }
});