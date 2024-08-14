let pomodoroInterval;
let pomodoroTime = 25 * 60; // 25 minutes in seconds
let ispomodoroRunning = false;

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
    if (ispomodoroRunning) return;
    ispomodoroRunning = true;
    pomodoroInterval = setInterval(() => {
        if (pomodoroTime <= 0) {
            clearInterval(pomodoroInterval);
            alert('Pomodoro session complete!');
            resetTimer();
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
    pomodoroTime = 25 * 60; // Reset to 25 minutes
    document.getElementById('timer-display').textContent = '25:00';
    ispomodoroRunning = false;
    document.getElementById('start-timer-btn').style.display = 'inline';
    document.getElementById('stop-timer-btn').style.display = 'none';
}
