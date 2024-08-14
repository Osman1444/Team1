function adddate(taskdate) {
    let date = '';
    date = prompt('Add your task or event name');
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

    let selectDay = `
        <input class="dayselect" type="date" value="${specificDate}">
    `;

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-name">${taskName}</span> ${selectDay}
    `;

    dateList.appendChild(li);

    // Call the function to upload the date to Google Calendar
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
