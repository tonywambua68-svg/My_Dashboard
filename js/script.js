const ctx = document.getElementById('weeklyChart')

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Weekly Progress',
      data: [5, 8, 3, 9, 6, 7, 4],
      backgroundColor: '#7c3aed',
      borderRadius: 8,
      borderWidth: 1
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