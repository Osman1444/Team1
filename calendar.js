
function adddate(taskdate) {
    let date = '';
    date = prompt('Add your task or event name');

    // Default date if no input
    if (taskdate === 0) {
        taskdate = '01';
    }

    if (date && taskdate) {
        addDate(date, taskdate);
    }
}

function addDate(taskName, taskdate) {
    const dateList = document.getElementById('date-list');
    const li = document.createElement('li');
    let specificDate = `2024-04-${taskdate}`;
    let startTime = 'T120000';  // Fixed start time 12 PM
    let endTime = 'T120000';    // Fixed end time 12 PM

    let selectDay = `
        <input class="dayselect" type="date" value="${specificDate}">
    `;

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-name">${taskName}</span> ${selectDay}
        <a href="https://calendar.google.com/calendar/u/0/r/eventedit?dates=${specificDate.replace(/-/g, '') + startTime}/${specificDate.replace(/-/g, '') + endTime}&ctz=GMT&text=${taskName}" target="_blank">Google Calendar</a>
    `;

    dateList.appendChild(li);

    // Call the function to upload the date to Google Calendar (via gAPI)
    addEventToCalendar(taskName, specificDate);
}

function addEventToCalendar(taskName, date) {
    var event = {
      'summary': taskName,
      'start': {
        'date': date,  // Date in the format YYYY-MM-DD
        'timeZone': 'America/Los_Angeles'  // Set the appropriate timezone
      },
      'end': {
        'date': date,  // Same end date for all-day events
        'timeZone': 'America/Los_Angeles'
      }
    };

    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',  // Add to the user's primary calendar
      'resource': event
    });

    request.execute(function(event) {
      console.log('Event created: ' + event.htmlLink);
    });
}