function insertCalendarSection() {
    const mainContent = document.getElementById('main-content');

    const calendarHTML = `
        <h1>Calendar</h1>
        <div class="calendar">
            <div class="calendar-header">
                <h2 id="calendar-month-year"></h2>
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
                <div class="calendar-days" id="calendar-days">
                    <!-- Calendar days will be inserted here dynamically -->
                </div>
            </div>
        </div>
    `;

    // Insert the calendar HTML into the main content area
    mainContent.innerHTML = calendarHTML;

    // Call generateCalendar after the calendar HTML is inserted
    generateCalendar();
}

function generateCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-based index (0 = January)
    const currentYear = today.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Day of week for the 1st of the month
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Last date of the month

    // Update month and year header
    document.getElementById('calendar-month-year').textContent = `${today.toLocaleString('default', { month: 'long' })} ${currentYear}`;

    // Generate days
    let daysHTML = '';
    for (let i = 0; i < firstDayOfMonth; i++) {
        daysHTML += '<div class="calendar-day empty"></div>'; // Empty divs for days before the 1st
    }

    for (let day = 1; day <= lastDateOfMonth; day++) {
        const isToday = (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear());
        daysHTML += `<div class="calendar-day ${isToday ? 'today' : ''}">${day}</div>`;
    }

    console.log(daysHTML); // Debugging: Check if daysHTML is being generated

    const calendarDaysContainer = document.getElementById('calendar-days');
    if (calendarDaysContainer) {
        calendarDaysContainer.innerHTML = daysHTML;
    } else {
        console.error('Calendar days container not found!');
    }
}


// Example call to insert the calendar section when needed
insertCalendarSection();
