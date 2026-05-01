let completedHabits = 0
const totalHabits = 4

function toggleHabit(button){
    const circle = button.querySelector('.circle')
    if(circle.classList.contains('done')){
        circle.classList.remove('done')      // empty the circle
        button.classList.remove('completed') // remove strikethrough
         completedHabits--   
    }
    else{
        circle.classList.add('done')      // fill circle with purple
        button.classList.add('completed') // add strikethrough
        completedHabits++ 
    }
     document.getElementById('habitCount').textContent = completedHabits + '/' + totalHabits
}


const ctx = document.getElementById('weeklyChart')

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Weekly Progress',
      data: [5, 8, 3, 9, 6, 7, 4],
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

