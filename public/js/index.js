import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js'
import { createBarChart } from './soldGamesChart.js'
import { createPieChart } from './gamePricesChart.js'

/**
 * Renders charts.
 */
function renderCharts () {
  createBarChart()
  createPieChart()
}
renderCharts()
