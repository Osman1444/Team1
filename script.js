let timerInterval;
let isTimerRunning = true;
const audio = new Audio('Source/alarm.wav');
showSection('home');

function showSection(sectionId) {
    const contents = document.getElementsByClassName('content');
    const home = document.getElementById('home-content');
    const timer = document.getElementById('timer-content');
    const calendar = document.getElementById('calendar-content');
    const task = document.getElementById('task-content');
    const feedback = document.getElementById('feedback-content');

    // Loop through all content sections and apply scale(0) to hide them
    for (let i = 0; i < contents.length; i++) {
        contents[i].style.transform = 'scale(0)';
    }

    // Show the selected section
    if (sectionId == 'home') {
        home.style.transform = 'scale(1)';
    } else if (sectionId == 'timer') {
        timer.style.transform = 'scale(1)';
    } else if (sectionId == 'calendar') {
        calendar.style.transform = 'scale(1)';
    } else if (sectionId == 'task') {
        task.style.transform = 'scale(1)';
    } else if (sectionId == 'feedback') {
        feedback.style.transform = 'scale(1)';
    }
}
