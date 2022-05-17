import { getChartData } from './getChartData.js'

/**
 * Creates pie chart showing game prices.
 *
 */
export async function createPieChart () {
  const json = await getChartData('/api/game-prices')
  const pieChart = document.querySelector('#pie-chart')
  const { intervalName, intervalValue } = json

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
