let timerInterval;
let isTimerRunning = true;
showSection('home');

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
        case 'home':
            content = `
                <h1>Welcome</h1>
                <div class="chat" id="chat-box"></div>
                <div class="suggestions" id="suggestions">
                    <ul>
                        <li><button type="button" class="suggestion-button">How can I improve my time management skills?</button></li>
                        <li><button type="button" class="suggestion-button">What are some effective time management techniques?</button></li>
                        <li><button type="button" class="suggestion-button">Can you suggest a daily schedule to optimize productivity?</button></li>
                        <li><button type="button" class="suggestion-button">How do I prioritize tasks effectively?</button></li>
                        <li><button type="button" class="suggestion-button">What tools or apps can help with time management?</button></li>
                    </ul>
                </div>
                <form id="chat-form">
                    <div class="input-group">
                        <input type="text" id="chat-input" placeholder="Type your message here" required>
                    </div>
                </form>
            `;
            break;
        case 'timer':
            content = `
                <h1>Timer</h1>
                <div class="timer">
                <input class="mtimer" type="text" id="work-mtimer" oninput="validateInput()"><span>:</span>
                <input class="stimer" type="text" id="work-stimer" oninput="validateInput()">
                </div>
                <span id="error-message" style="color: red; opacity: 0; transition: opacity 0.5s ease;"></span>
                <div class="timer-buttons">
                    <button id="start-btn" onclick="startTimer()">Start</button>
                    <button id="stop-btn" onclick="stopTimer()" style="display: none;">Stop</button>
                </div>
            `;
            break;
        case 'calendar':
            content = `
            <h1>Calendar</h1>
            <div>
                <div class="calendar">
                <div class="calendar-header">
                    <h2>August 2024</h2>
                </div>
                <div class="calendar-body">
                    <div class="calendar-weekdays">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div class="calendar-days">
                        <div class="calendar-day">28</div>
                        <div class="calendar-day">29</div>
                        <div class="calendar-day">30</div>
                        <div class="calendar-day">31</div>
                        <div class="calendar-day">1</div>
                        <div class="calendar-day">2</div>
                        <div class="calendar-day">3</div>
                        <div class="calendar-day">4</div>
                        <div class="calendar-day">5</div>
                        <div class="calendar-day">6</div>
                        <div class="calendar-day">7</div>
                        <div class="calendar-day">8</div>
                        <div class="calendar-day">9</div>
                        <div class="calendar-day">10</div>
                        <div class="calendar-day">11</div>
                        <div class="calendar-day">12</div>
                        <div class="calendar-day">13</div>
                        <div class="calendar-day">14</div>
                        <div class="calendar-day">15</div>
                        <div class="calendar-day">16</div>
                        <div class="calendar-day">17</div>
                        <div class="calendar-day">18</div>
                        <div class="calendar-day">19</div>
                        <div class="calendar-day">20</div>
                        <div class="calendar-day">21</div>
                        <div class="calendar-day">22</div>
                        <div class="calendar-day">23</div>
                        <div class="calendar-day">24</div>
                        <div class="calendar-day">25</div>
                        <div class="calendar-day">26</div>
                        <div class="calendar-day">27</div>
                        <div class="calendar-day">28</div>
                        <div class="calendar-day">29</div>
                        <div class="calendar-day">30</div>
                        <div class="calendar-day today">31</div>
                    </div>
                </div>
            </div>
            <div class="dates">
            </div>
        </div>
            `;
            break;
        case 'task':
            content = `
            <h1>Task Manager</h1>
            <div class="tasksection">
                <div class="tasklist">
                <button id="add-task-btn" onclick="addTaskPrompt()">+</button>
                <ul id="task-list">
                    <!-- Tasks will be added here dynamically -->
                </ul>
                </div>
                <div id="pomodoro-timer">
                    <h2>Pomodoro Timer</h2>
                    <input type="text" id="task-name" placeholder="Task name" readonly>
                    <div id="timer-display">25:00</div>
                    <button id="start-timer-btn" onclick="startPomodoro()">Start Timer</button>
                    <button id="stop-timer-btn" onclick="stopPomodoro()" style="display: none;">Stop Timer</button>
                </div>
            </div>
            `;
            break;
    }

    // Inject new content into main
    main.innerHTML = content;

    // Apply fade-in effect
    fadeIn(main);

    // Initialize chat form handler if AI Assessment section is loaded
    if (sectionId === 'home') {
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
