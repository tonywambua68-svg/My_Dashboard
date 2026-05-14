const API_URL = window.location.origin;
let completedHabits = 0;
let completedTasks = 0;
let totalTasks = 0;
let totalHabits = 0;

// ✅ NEW — load habits from database when page opens
function loadHabits(){
   fetch(`${API_URL}/habits`)
    .then(res => res.json())
    .then(habits => {
        const habitList = document.getElementById('habitList');
        habitList.innerHTML = '';
        totalHabits = habits.length;
        completedHabits = 0;

        habits.forEach(habit => {
            const btn = document.createElement('button');
            btn.classList.add('btn');
            btn.innerHTML = `<span class="circle"></span><span class="habit-text">${habit.name}</span>`;
            btn.setAttribute('onclick', 'toggleHabit(this)');
            btn.setAttribute('ondblclick', 'editHabit(this)');
            btn.setAttribute('data-id', habit.id);

            if(habit.completed){
                btn.classList.add('completed');
                btn.querySelector('.circle').classList.add('done');
                completedHabits++;
            }

            habitList.appendChild(btn);
        });

        document.getElementById('habitCount').textContent = completedHabits + '/' + totalHabits;
        updateStats();
    })
    .catch(err => {
        console.log('Error loading habits', err);
    });
}

function addTask(){
    const input = document.getElementById('taskInput');
    const taskName = input.value.trim();

    if(taskName === ''){
        alert('please enter a task name');
        return;
    }

    fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName })
    })
    .then(res => res.json())
    .then(data => {
        const taskList = document.getElementById('taskList');
        const newTask = document.createElement('button');
        newTask.classList.add('role');
        newTask.innerHTML = `<span class="circle"></span><span class="task-text">${taskName}</span>`;
        newTask.setAttribute('onclick', 'toggleTask(this)');
        newTask.setAttribute('data-id', data.id);
        taskList.appendChild(newTask);
        totalTasks++;
        document.getElementById('taskCount').textContent = completedTasks + '/' + totalTasks;
        input.value = '';
    })
    .catch(err => {
        console.log('Error adding task', err);
    });
}

function loadTasks(){
    fetch(`${API_URL}/tasks`)
    .then(res => res.json())
    .then(tasks => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        totalTasks = tasks.length;
        completedTasks = 0;

        tasks.forEach(task => {
            const newTask = document.createElement('button');
            newTask.classList.add('role');
            newTask.innerHTML = `<span class="circle"></span><span class="task-text">${task.name}</span>`;
            newTask.setAttribute('onclick', 'toggleTask(this)');
            newTask.setAttribute('data-id', task.id);
            if(task.completed){
                newTask.classList.add('completed');
                newTask.querySelector('.circle').classList.add('done');
                completedTasks++;
            }
            taskList.appendChild(newTask);
        });

        document.getElementById('taskCount').textContent = completedTasks + '/' + totalTasks;
        updateStats();
    })
    .catch(err => {
        console.log('Error loading tasks', err);
    });
}
  

function toggleHabit(button){
    const circle = button.querySelector('.circle');
    const id = button.getAttribute('data-id'); // ✅ NEW — get id from button

    if(circle.classList.contains('done')){
        circle.classList.remove('done');
        button.classList.remove('completed');
        completedHabits--;

        // ✅ NEW — save to database
        fetch(`${API_URL}/habits/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                completed: 0,
                streak: 0,
                week_count: 0
            })
        })
        .catch(err => console.log('Error updating habit', err));

    } else {
        circle.classList.add('done');
        button.classList.add('completed');
        completedHabits++;

        // ✅ NEW — save to database
        fetch(`${API_URL}/habits/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                completed: 1,
                streak: 1,
                week_count: 1
            })
        })
        .catch(err => console.log('Error updating habit', err));
    }

    document.getElementById('habitCount').textContent = completedHabits + '/' + totalHabits;
    updateStats();
}

function toggleTask(button){
    const circle = button.querySelector('.circle');
    const id = button.getAttribute('data-id');

    if(circle.classList.contains('done')){
        return;
    }

    circle.classList.add('done');
    button.classList.add('completed');
    completedTasks++;

    fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: 1 })
    })
    .catch(err => console.log('Error updating task', err));

    document.getElementById('taskCount').textContent = completedTasks + '/' + totalTasks;
    updateStats();
}

// ✅ FIXED editHabit bug
function editHabit(button){
    const habitText = button.querySelector('.habit-text');
    const currentText = habitText.textContent;
    const newText = prompt('Edit habit name:', currentText);

    if(newText !== null && newText.trim() !== ''){
        habitText.textContent = newText;

        // ✅ NEW — save to database
        const id = button.getAttribute('data-id');
        fetch(`${API_URL}/habits/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newText })
        })
        .catch(err => console.log('Error editing habit', err));
    }
}

function updateStats(){
    const today = new Date().getDay();
    const totalDone = completedHabits + completedTasks;
    document.getElementById('streakCount').textContent = completedHabits;
    document.getElementById('weekCount').textContent = totalDone + ' done';

    myChart.data.datasets[0].data[today] = totalDone;
    myChart.update();
}

// ✅ UPDATED addHabit — saves to database
function addHabit(){
    const input = document.getElementById('habitInput');
    const habitName = input.value.trim();

    if(habitName === ''){
        alert('please enter a habit name');
        return;
    }

    fetch(`${API_URL}/habits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: habitName })
    })
    .then(res => res.json())
    .then(data => {
        const habitList = document.getElementById('habitList');
        const newHabit = document.createElement('button');
        newHabit.classList.add('btn');
        newHabit.innerHTML = `<span class="circle"></span><span class="habit-text">${habitName}</span>`;
        newHabit.setAttribute('onclick', 'toggleHabit(this)');
        newHabit.setAttribute('ondblclick', 'editHabit(this)');
        newHabit.setAttribute('data-id', data.id);
        habitList.appendChild(newHabit);
        totalHabits++;
        document.getElementById('habitCount').textContent = completedHabits + '/' + totalHabits;
        input.value = '';
    })
    .catch(err => {
        console.log('Error adding habit', err);
    });
}

const ctx = document.getElementById('weeklyChart');

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
            label: 'Weekly Progress',
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: '#7c3aed',
            backgroundColor: '#7c3aed33',
            borderWidth: 2,
            pointBackgroundColor: '#a855f7',
            pointRadius: 5,
            tension: 0.4
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: '#e9d5ff'
                }
            }
        },
        scales: {
            x: { ticks: { color: '#e9d5ff' } },
            y: { ticks: { color: '#e9d5ff' } }
        }
    }
});

// ✅ NEW — load habits when page opens
loadHabits();
loadTasks();