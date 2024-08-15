let timerInterval;
let isTimerRunning = true;
const audio = new Audio('Source/alarm.wav');
showSection('home');

function showSection(sectionId) {
    const home = document.getElementById('home-content');
    const timer = document.getElementById('timer-content');
    const calendar = document.getElementById('calendar-content');
    const task = document.getElementById('task-content');
    const feedback = document.getElementById('feedback-content');

    if (sectionId == 'home'){
        home.style.transform = 'scale(1)';
        timer.style.transform = 'scale(0)';
        calendar.style.transform = 'scale(0)';
        task.style.transform = 'scale(0)';
        feedback.style.transform = 'scale(0)';

    } else if (sectionId == 'timer'){
        home.style.transform = 'scale(0)';
        timer.style.transform = 'scale(1)';
        calendar.style.transform = 'scale(0)';
        task.style.transform = 'scale(0)';
        feedback.style.transform = 'scale(0)';

    } else  if (sectionId == 'calendar'){
        home.style.transform = 'scale(0)';
        timer.style.transform = 'scale(0)';
        calendar.style.transform = 'scale(1)';
        task.style.transform = 'scale(0)';
        feedback.style.transform = 'scale(0)';

    } else if (sectionId == 'task'){
        home.style.transform = 'scale(0)';
        timer.style.transform = 'scale(0)';
        calendar.style.transform = 'scale(0)';
        task.style.transform = 'scale(1)';
        feedback.style.transform = 'scale(0)';
    } else if (sectionId == 'feedback'){
        home.style.transform = 'scale(0)';
        timer.style.transform = 'scale(0)';
        calendar.style.transform = 'scale(0)';
        task.style.transform = 'scale(0)';
        feedback.style.transform = 'scale(1)';
    }
}
