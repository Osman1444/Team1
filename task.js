let isPomodoroRunning = false;
let pomodoroInterval;
let pomodoroTime = 6; // Initial time set to 6 seconds for testing
const workTime = 25 * 60; // 6 seconds for testing
const restTime = 5 * 60; // 5 minutes for rest
let isWorkPhase = true; // To track the phase (work or rest)

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
    starttimer(workTime);
}

function starttimer(time) {
    pomodoroTime = time;
    pomodoroInterval = setInterval(() => {
        if (pomodoroTime <= 0) {
            clearInterval(pomodoroInterval);
            alrt();
            if (isWorkPhase) {
                // After work session, start rest period
                isWorkPhase = false;
                updatePhaseMessage('Rest', 'green'); // Update the message to "Rest" and set color to green
                starttimer(restTime);
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

function stopPomodoro() {
    clearInterval(pomodoroInterval);
    resetTimer();
}

function resetTimer() {
    pomodoroTime = workTime; // Reset to 6 seconds for testing
    document.getElementById('timer-display').textContent = '25:00';
    isPomodoroRunning = false;
    isWorkPhase = true; // Reset phase to work
    updatePhaseMessage('Work', 'red'); // Update the message to "Work" and set color to red
    document.getElementById('start-timer-btn').style.display = 'inline';
    document.getElementById('stop-timer-btn').style.display = 'none';
}

function updatePhaseMessage(message, colr) {
    document.getElementById('pomodoro-message').textContent = message;
    document.getElementById('pomodoro-message').style.color = colr;
}


function addTaskPrompt() {
    const taskInput = prompt('Enter the task name:');
    if (taskInput) {
        addTask(taskInput);
    }
}

function addTask(taskName) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-name">${taskName}</span>
    `;
    li.onclick = function() {
        selectTask(taskName);
    };
    taskList.appendChild(li);
}

function selectTask(taskName) {
    document.getElementById('task-name').value = taskName;
    resetTimer(); // Optionally reset the timer when a new task is selected
}

function startPomodoro() {
    const taskName = document.getElementById('task-name').value;
    if (!taskName) {
        alert('Please select a task first.');
        return;
    }
    if (isPomodoroRunning) return;

    isPomodoroRunning = true;
    starttimer(workTime);
}