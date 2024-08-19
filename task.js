let isPomodoroRunning = false;
let pomodoroInterval;
let pomodoroTime = 6; // Initial time set to 6 seconds for testing
const workTime = 25 * 60; // Work time in seconds (25 minutes)
const restTime = 5 * 60; // Rest time in seconds (5 minutes)
let isWorkPhase = true; // To track the phase (work or rest)

// Function to start the Pomodoro timer
function startPomodoro() {
    const taskName = document.getElementById('task-name').value;
    if (!taskName) {
        alert('Please select a task first.');
        return;
    }
    if (isPomodoroRunning) return;

    isPomodoroRunning = true;
    isWorkPhase = true; // Start with work phase
    updatePhaseMessage('Work', 'red'); // Update the message to "Work" and set color to red
    starttimer(workTime); // Start the work timer
}

// Function to start the timer
function starttimer(time) {
    pomodoroTime = time;
    pomodoroInterval = setInterval(() => {
        if (pomodoroTime <= 0) {
            clearInterval(pomodoroInterval);
            alrt(); // Call your custom alert function
            if (isWorkPhase) {
                // After work session, start rest period
                isWorkPhase = false;
                updatePhaseMessage('Rest', 'green'); // Update the message to "Rest" and set color to green
                starttimer(restTime); // Start the rest timer
            } else {
                resetTimer(); // Reset after rest period
            }
            return;
        }

        pomodoroTime--;
        const minutes = Math.floor(pomodoroTime / 60);
        const seconds = pomodoroTime % 60;
        document.getElementById('timer-display').textContent = 
            `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);

    document.getElementById('start-timer-btn').style.display = 'none';
    document.getElementById('stop-timer-btn').style.display = 'inline';
}

// Function to stop the Pomodoro timer
function stopPomodoro() {
    clearInterval(pomodoroInterval);
    resetTimer();
}

// Function to reset the timer
function resetTimer() {
    pomodoroTime = workTime; // Reset to work time (25 minutes for actual use)
    document.getElementById('timer-display').textContent = '25:00'; // Reset display
    isPomodoroRunning = false;
    isWorkPhase = true; // Reset phase to work
    updatePhaseMessage('Work', 'red'); // Update the message to "Work" and set color to red
    document.getElementById('start-timer-btn').style.display = 'inline';
    document.getElementById('stop-timer-btn').style.display = 'none';
}

// Function to update phase message
function updatePhaseMessage(message, color) {
    document.getElementById('pomodoro-message').textContent = message;
    document.getElementById('pomodoro-message').style.color = color;
}

// Function to prompt user for task name and add it to the list
function addTaskPrompt() {
    const taskInput = prompt('Enter the task name:');
    if (taskInput) {
        addTask(taskInput);
    }
}

// Function to add a new task to the task list
function addTask(taskName) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    
    // Create task item with a delete button
    li.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-name">${taskName}</span>
        <button class="delete-btn">Delete</button>
    `;
    
    // Add event listener for delete button
    li.querySelector('.delete-btn').onclick = function() {
        deleteTask(li);
    };

    li.onclick = function() {
        selectTask(taskName);
    };

    taskList.appendChild(li);
    saveTasksToCookies(); // Save tasks to cookies after adding
}

// Function to delete a task from the task list
function deleteTask(taskElement) {
    const taskList = document.getElementById('task-list');
    taskList.removeChild(taskElement);
    saveTasksToCookies(); // Save tasks to cookies after deleting
}

// Function to select a task from the list
function selectTask(taskName) {
    document.getElementById('task-name').value = taskName;
    resetTimer(); // Optionally reset the timer when a new task is selected
}

// Function to save tasks to cookies
function saveTasksToCookies() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    const taskItems = taskList.getElementsByTagName('li');
    
    for (let i = 0; i < taskItems.length; i++) {
        const taskName = taskItems[i].getElementsByClassName('task-name')[0].textContent;
        tasks.push(taskName);
    }
    
    // Convert tasks array to JSON string and set it as a cookie
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))}; path=/`;
}

// Function to load tasks from cookies
function loadTasksFromCookies() {
    const cookieName = 'tasks=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(cookieName) === 0) {
            const tasksString = c.substring(cookieName.length, c.length);
            const tasks = JSON.parse(tasksString);
            tasks.forEach(taskName => addTask(taskName)); // Add each task to the list
            return;
        }
    }
}

// Call loadTasksFromCookies when the page loads
window.onload = function() {
    loadTasksFromCookies();
};
