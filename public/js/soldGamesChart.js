import { getChartData } from './getChartData.js'

/**
 * Creates bar chart showing number of sold games.
 *
 */
export async function createBarChart () {
  const json = await getChartData('/api/owners-per-game')
  const barChart = document.querySelector('#bar-chart')
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
      scales: {
        y: {
          title: {
            display: true,
            text: 'Antal spel'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Antal sålda spel'
          }
        }
      },
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
