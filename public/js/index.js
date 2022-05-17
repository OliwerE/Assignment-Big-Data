import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js'

const barChart = document.querySelector('#bar-chart')
const pieChart = document.querySelector('#pie-chart')

// bar chart

fetch('/api/owners-per-game').then(res => {
  return res.json()
}).then(json => {
  createBarChart(json)
}).catch(err => {
  console.error(err)
})

/**
 * Creates bar chart showing number of sold games.
 *
 * @param {JSON} json - Chart data.
 */
function createBarChart (json) {
  const { barName, barValue } = json

  // eslint-disable-next-line no-unused-vars, no-undef
  const chart = new Chart(barChart, {
    type: 'bar',
    data: {
      labels: barName,
      datasets: [{
        label: 'Antal spel',
        backgroundColor: [
          'red',
          'green',
          'blue',
          'orange',
          'brown',
          'purple'],
        data: barValue
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Antal sålda spel'
        }
      }
    }
  })
}

// pie chart

fetch('/api/game-prices').then(res => {
  return res.json()
}).then(json => {
  createPieChart(json)
}).catch(err => {
  console.error(err)
})

/**
 * Creates pie chart showing game prices.
 *
 * @param {JSON} json - Chart data.
 */
function createPieChart (json) {
  const { intervalName, intervalValue } = json
  console.log(intervalName)
  // eslint-disable-next-line no-unused-vars, no-undef
  const chart = new Chart(pieChart, {
    type: 'pie',
    data: {
      labels: intervalName,
      datasets: [{
        backgroundColor: [
          'red',
          'green',
          'blue',
          'orange',
          'brown',
          'purple'],
        data: intervalValue
      }]
    },
    options: {
      plugins: {
        legend: { display: true },
        title: {
          display: true,
          text: 'Spel priser (Euro)'
        }
      }
    }
  })
}
