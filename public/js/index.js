import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js'

const myChart = document.querySelector('#chart')

// const barName = ['0-20000', '20-50000', '50000-100000', '100000-200000', '200000-500000', 'Other']
// const barValue = [18596, 3059, 1695, 1386, 1272, 1067]
const barColors = ['red', 'green', 'blue', 'orange', 'brown', 'purple']

fetch('/api/owners-per-game').then(res => {
  return res.json()
}).then(json => {
  createChart(json)
}).catch(err => {
  console.error(err)
})

function createChart (json) {
  const { barName, barValue } = json

  // eslint-disable-next-line no-unused-vars, no-undef
  const chart = new Chart(myChart, {
    type: 'bar',
    data: {
      labels: barName,
      datasets: [{
        backgroundColor: barColors,
        data: barValue
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Number of game owners per game'
        }
      }
    }
  })
}
