let timerInterval;
let isTimerRunning = false;

function fadeOut(element, callback) {
    element.style.opacity = 0;
    setTimeout(callback, 500); // Match the duration with CSS transition
}

function fadeIn(element) {
    element.style.opacity = 1;
}

function loadContent(sectionId) {
    const main = document.getElementById('main-content');
    let content = '';

    switch (sectionId) {
        case 'timer':
            content = `
                <h1>Timer</h1>
                <input class="timer" type="text" id="work-timer" oninput="validateInput()">
                <span id="error-message" style="color: red; opacity: 0; transition: opacity 0.5s ease;"></span>
                <div class="timer-buttons">
                    <button id="start-btn" onclick="startTimer()">Start Timer</button>
                    <button id="stop-btn" onclick="stopTimer()" style="display: none;">Stop Timer</button>
                </div>
            `;
            break;
        case 'calendar':
            content = `
                <h1>Calendar</h1>
                <!-- Calendar content goes here -->
            `;
            break;
        case 'ai':
            content = `
                <h1>AI Assessment</h1>
                <div class="chat" id="chat-box"></div>
                <form id="chat-form">
                    <div class="input-group">
                        <input type="text" id="chat-input" placeholder="Type here" required>
                    </div>
                </form>
            `;
            break;
    }

    // Inject new content into main
    main.innerHTML = content;

    // Apply fade-in effect
    fadeIn(main);

    // Initialize chat form handler if AI Assessment section is loaded
    if (sectionId === 'ai') {
        document.getElementById('chat-form').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page refresh

            const chatInput = document.getElementById('chat-input');
            const chatBox = document.getElementById('chat-box');

            const userMessage = chatInput.value.trim();
            if (userMessage === "") return;

            // Append user message to chat
            appendMessage(userMessage, 'user');

            chatInput.value = '';

            // Send message to API
            sendToAPI(userMessage);
        });
    }
}

function showSection(sectionId) {
    const main = document.getElementById('main-content');
    
    // Fade out and replace content
    fadeOut(main, () => {
        loadContent(sectionId);
    });
}

function validateInput() {
    const input = document.getElementById('work-timer');
    const errorMessage = document.getElementById('error-message');
    const maxMinutes = 999;

    // Remove non-digit characters
    input.value = input.value.replace(/[^0-9]/g, '');

    if (input.value > maxMinutes) {
        errorMessage.textContent = "The maximum allowed time is 999 minutes.";
        input.value = maxMinutes;
        errorMessage.style.opacity = 1;
    } else if (input.value < 0) {
        errorMessage.textContent = "Please enter a positive number.";
        input.value = 0;
        errorMessage.style.opacity = 1;
    } else {
        errorMessage.style.opacity = 0;
    }
}

function startTimer() {
    const input = document.getElementById('work-timer');
    let time = parseInt(input.value) * 60; // Convert minutes to seconds

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (time <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            input.value = '';
            toggleButtons();
        } else {
            time--;
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            input.value = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);

    toggleButtons();
}

function stopTimer() {
    clearInterval(timerInterval);
    const input = document.getElementById('work-timer');
    input.value = ''; // Clear the input value
    toggleButtons();
}

function toggleButtons() {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');

    if (isTimerRunning) {
        startBtn.classList.add('hide');
        stopBtn.classList.remove('hide');
    } else {
        startBtn.classList.remove('hide');
        stopBtn.classList.add('hide');
    }
    isTimerRunning = !isTimerRunning;
}

function sendToAPI(userMessage) {
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.6
        })
    })
    .then(response => response.json())
    .then(data => {
        const aiMessage = data.choices[0].text.trim();
        appendMessage(aiMessage, 'ai');
    })
    .catch(error => {
        appendMessage('Sorry, there was an error connecting to the AI service.', 'error');
    });
}

function appendMessage(message, sender) {
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

// Initialize by showing the welcome page
showSection('timer');
