/**
 * Returns data from api.
 *
 * @param {string} url - Url to fetch.
 * @returns {JSON} - Response from request.
 */
export async function getChartData (url) {
  const res = await fetch(url)
  return res.json()
}
