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
   * @param {object} elasticClient - Elastic search client.
   */
  async ownersPerGame (req, res, next, elasticClient) {
    try {
      const intervals = ['0-20000', '20000-50000', '50000-100000', '100000-200000', '200000-500000', '500000+']
      const intervalValues = []

      // Get values of all intervals except 500 000+
      for (let i = 0; i < (intervals.length - 1); i++) { // -1 because 500 000+ is not an owners interval in elastic.
        const intervalValue = await elasticClient.count({
          index: 'steam',
          query: {
            match: {
              owners: intervals[i]
            }
          }
        })
        intervalValues.push(intervalValue.count)
      }

      // Count 500 000+ games
      const numberOfGamesAboveIntervals = await elasticClient.count({
        index: 'steam',
        query: {
          bool: {
            must_not: [
              {
                terms: {
                  owners: [
                    '0-20000',
                    '20000-50000',
                    '50000-100000',
                    '100000-200000',
                    '200000-500000'
                  ]
                }
              }
            ]
          }
        }
      })
      intervalValues.push(numberOfGamesAboveIntervals.count)
      res.json({ barName: intervals, barValue: intervalValues })
    } catch (err) {
      next(createError(500))
    }
  }

  /**
   * Returns all game prices in intervals.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {Function} next - Next function.
   * @param {object} elasticClient - Elastic search client.
   */
  async gamePrices (req, res, next, elasticClient) {
    try {
      const intervalName = ['0.0', '0.01-1.00', '1.01-10.00', '10.01-20.00', '20.01-30', '30+']
      const intervalValue = []

      for (let i = 0; i < intervalName.length; i++) {
        if (i === 0) { // Free games (0.0 eur)
          const response = await elasticClient.count({
            index: 'steam',
            query: {
              match: {
                price: '0.0'
              }
            }
          })
          intervalValue.push(response.count)
        } else if (i === (intervalName.length - 1)) { // Above 30 eur games.
          const response = await elasticClient.count({
            index: 'steam',
            query: {
              range: {
                price: {
                  gte: '30.01'
                }
              }
            }
          })
          intervalValue.push(response.count)
        } else {
          const minMaxValues = intervalName[i].split('-')

          const response = await elasticClient.count({
            index: 'steam',
            query: {
              range: {
                price: {
                  gte: minMaxValues[0], // 0 = min value
                  lte: minMaxValues[1] // 1 = max value
                }
              }
            }
          })
          intervalValue.push(response.count)
        }
      }
      res.json({ intervalName, intervalValue })
    } catch (err) {
      next(createError(500))
    }
  }
}
