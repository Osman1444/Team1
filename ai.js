async function sendToAPI(userMessage) {
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-large', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                inputs: userMessage
            })
        });

        if (response.status === 400) {
            console.error('Bad request. Check your input format and model endpoint.');
            appendMessage('Bad request. Please check your input and try again.', 'error');
            return;
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data && data.length > 0) {
            const aiMessage = data[0].generated_text.trim();
            appendMessage(aiMessage, 'ai');
        } else {
            appendMessage('No response from the AI service.', 'error');
        }
    } catch (error) {
        console.error('Error in API request:', error);
        appendMessage('Sorry, there was an error connecting to the AI service.', 'error');
    }
}


function appendMessage(message, sender) {
    document.getElementById('suggestions').style.display = 'none';
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;

    // Append and show message
    chatBox.appendChild(messageElement);
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to handle suggestion button clicks
document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('suggestion-button')) {
        const chatInput = document.getElementById('chat-input');
        chatInput.value = event.target.textContent;
        chatInput.focus();
    }
});
