document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');
    const streetTitle = document.getElementById('streetTitle');
    const currentHourResult = document.getElementById('currentHourResult');
    const todayScheduleTable = document.getElementById('todaySchedule');
    const weeklyScheduleTable = document.getElementById('weeklySchedule');
    const autocompleteList = document.getElementById('autocomplete-list');

    let scheduleData = {};
    let streetNames = [];

    // 1. Fetch the data from our JSON file
    fetch('schedules.json')
        .then(response => response.json())
        .then(data => {
            scheduleData = data;
            streetNames = Object.keys(data);
        })
        .catch(error => console.error('Error loading schedule data:', error));

    // 2. Handle search input and autocomplete
    searchInput.addEventListener('input', function() {
        const query = this.value;
        autocompleteList.innerHTML = '';
        if (!query) return;

        const filteredStreets = streetNames
            .filter(name => name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5); // Show top 5 matches

        filteredStreets.forEach(street => {
            const div = document.createElement('div');
            div.textContent = street;
            div.addEventListener('click', () => {
                searchInput.value = street;
                autocompleteList.innerHTML = '';
                displayScheduleForStreet(street);
            });
            autocompleteList.appendChild(div);
        });
    });
    
    // 3. Main function to display all the data for a selected street
    function displayScheduleForStreet(street) {
        if (!scheduleData[street]) {
            resultsDiv.classList.add('hidden');
            return;
        }

        const data = scheduleData[street];
        streetTitle.textContent = street;

        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDayName = days[now.getDay()];
        const currentHour = now.getHours();

        // Display Current Hour Info
        const currentData = data[currentDayName][currentHour];
        currentHourResult.textContent = `The likelihood is currently ${currentData.text.toLowerCase()} (${currentData.percentage}%).`;
        
        // Display Today's Schedule
        displayTodaySchedule(data[currentDayName], currentHour);

        // Display Weekly Schedule
        displayWeeklySchedule(data);

        resultsDiv.classList.remove('hidden');
    }

    function displayTodaySchedule(dayData, currentHour) {
        todayScheduleTable.innerHTML = `<tr><th>Time</th><th>Likelihood</th></tr>`;
        for (let i = currentHour; i < 24; i++) {
            const hourData = dayData[i];
            const row = todayScheduleTable.insertRow();
            row.className = `ll-${hourData.text.toLowerCase().replace(' ', '-')}`;
            row.innerHTML = `<td>${hourData.hour}:00 - ${hourData.hour+1}:00</td><td>${hourData.text}</td>`;
        }
    }

    function displayWeeklySchedule(streetData) {
        const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let headerHtml = '<tr><th>Time</th>';
        daysOrder.forEach(day => headerHtml += `<th>${day.substring(0,3)}</th>`);
        headerHtml += '</tr>';
        
        let bodyHtml = '';
        for (let hour = 0; hour < 24; hour++) {
            bodyHtml += `<tr><td>${hour}:00</td>`;
            daysOrder.forEach(day => {
                const hourData = streetData[day][hour];
                bodyHtml += `<td class="ll-${hourData.text.toLowerCase().replace(' ', '-')}">${hourData.text}</td>`;
            });
            bodyHtml += '</tr>';
        }
        weeklyScheduleTable.innerHTML = headerHtml + bodyHtml;
    }
});
