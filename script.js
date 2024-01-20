const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function generateCalendar() {

    const startDateInput = document.getElementById("startdate");
    const selectedDate = new Date(startDateInput.value);
    if (!isNaN(selectedDate)) {
        workingSaturdays = getWorkingSaturdaysForMonth(currentMonth, currentYear, selectedDate);
        document.getElementById('calendar-container').style.display = "block";
    }
    
    const calendarContainer = document.getElementById('calendar');
    calendarContainer.innerHTML = '';

    // Set the current month in the header
    document.getElementById('current-month').textContent = `${new Date(currentYear, currentMonth).toLocaleString('en-GB', { month: 'long', year: 'numeric' })}`;

    // Generate header row with days of the week
    const headerRow = document.createElement('div');
    headerRow.classList.add('day');
    daysOfWeek.forEach(day => {
        const cell = document.createElement('div');
        cell.textContent = day;
        calendarContainer.appendChild(cell);
    });

    // Generate days for the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    emptyDays = daysOfWeek.indexOf(daysOfWeek[firstDayOfMonth.getDay()]) - 1;
    if (emptyDays === -1) {
        emptyDays = 6;
    }
    for (let i = 0; i < emptyDays; i++) {
        const cell = document.createElement('div');
        cell.classList.add('day');
        cell.textContent = "";

        cell.addEventListener('click', () => alert(`Clicked on ${date.toDateString()}`));

        calendarContainer.appendChild(cell);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentYear, currentMonth, i);

        const cell = document.createElement('div');
        cell.classList.add('day');
        cell.textContent = i;
        
        // 0 - Monday, 6 - Sunday
        for (let j = 0; j < workingSaturdays.length; j++) {
            if (i === workingSaturdays[j].getDate()) {
                cell.style.backgroundColor = "#3498db";
                cell.style.color = "#fff";
                // remove the working Saturday from the array
                workingSaturdays.splice(j, 1);
            }
    
        }

        cell.addEventListener('click', () => alert(`Clicked on ${date.toDateString()}`));

        calendarContainer.appendChild(cell);
    }
}

function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
}

function getWorkingSaturdaysForMonth(currentMonth, currentYear, initialWorkingSaturday) {
    workingSaturdays = [];

    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    while (currentMonth !== initialWorkingSaturday.getMonth()) {
        // add 14 days to the initial working Saturday date until the month matches
        var result = initialWorkingSaturday.setDate(initialWorkingSaturday.getDate() + 14);
        var initialWorkingSaturday = new Date(result);
    }

    if (initialWorkingSaturday.getMonth() === currentMonth && initialWorkingSaturday.getFullYear() === currentYear) {
        for (let i = initialWorkingSaturday.getDate(); i <= daysInMonth; i += 14) {
            workingSaturdays.push(new Date(currentYear, currentMonth, i));
        }
    }
    return workingSaturdays;
}

// Initial calendar generation
generateCalendar();