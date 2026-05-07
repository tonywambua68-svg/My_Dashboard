let completedHabits = 0;
let completedTasks = 0;
console.log("completedHabits =", completedHabits);
let totalTasks = 4;
let totalHabits = document.querySelectorAll('.btn').length;
console.log(totalHabits);

function toggleHabit(button){
    const circle = button.querySelector('.circle')
    if(circle.classList.contains('done')){
        circle.classList.remove('done')
        button.classList.remove('completed')
        completedHabits--
    }
    else{
        circle.classList.add('done')
        button.classList.add('completed')
        completedHabits++
    }
    document.getElementById('habitCount').textContent = completedHabits + '/' + totalHabits
    updateStats();

  }

function toggleTask(button){
    const circle = button.querySelector('.circle')
    
    if(circle.classList.contains('done')){
        return
    }
    
    circle.classList.add('done')
    button.classList.add('completed')
    completedTasks++
    
    document.getElementById('taskCount').textContent = completedTasks + '/' + totalTasks
    updateStats();
}
function editHabit(button){
    const currentText = button.querySelector('.habit-text')
    const newText = prompt('Edit habit name:', currentText)
    if(newText !== null && newText.trim() !== ''){
         habitText.textContent = newText;
    }
  
}

function updateStats(){
    const today = new Date().getDay()
    const totalDone = completedHabits + completedTasks
    document.getElementById('streakCount').textContent = completedHabits
    document.getElementById('weekCount').textContent = totalDone + ' done'
    
    myChart.data.datasets[0].data[today] = totalDone
    myChart.update()
}

function addHabit(){
const input = document.getElementById('habitInput');
const habitName = input.value.trim();
if (habitName === ''){
  alert ("please enter a habit name");
  return;
}
const habitList = document.getElementById('habitList');
const newHabit = document.createElement('button');
newHabit.classList.add('btn');
newHabit.innerHTML = `<span class="circle"></span> ${habitName}`;
newHabit.setAttribute('onclick', 'toggleHabit(this)');
habitList.appendChild(newHabit);
totalHabits ++;
document.getElementById('habitCount').textContent = completedHabits + '/' + totalHabits;
input.value ='';
}


const ctx = document.getElementById('weeklyChart')

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
})


