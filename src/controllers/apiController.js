/**
 * Module represents API controller.
 */

import createError from 'http-errors'

/**
 * Class represents API controller.
 */
export class ApiController {
  /**
   * Returns Number of game owners per game in each interval.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {Function} next - Next function.
   * @param {object} client - Elastic search client.
   */
  async ownersPerGame (req, res, next, client) {
    try {
      const bars = ['0-20000', '20000-50000', '50000-100000', '100000-200000', '200000-500000', '500000+']
      const values = []

      // Get values of all intervals except 500 000+
      for (let i = 0; i < (bars.length - 1); i++) { // -1 because 500 000+ is not an owners interval in elastic.
        const res = await client.count({
          index: 'steam',
          query: {
            match: {
              owners: bars[i]
            }
          }
        })
        values.push(res.count)
      }

      // Get sum of intervals above 500 000.
      let valuesSum = 0
      values.forEach(s => {
        valuesSum += s
      })

      // Add interval 500 000+
      const gameCount = await client.count({
        index: 'steam'
      })
      values.push(gameCount.count - valuesSum)

      // console.log(values)

      res.json({ barName: bars, barValue: values })
    } catch (err) {
      console.log(err)
      next(createError(500))
    }
  }
}
