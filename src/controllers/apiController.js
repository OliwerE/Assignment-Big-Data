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
      const intervals = ['0-20000', '20000-50000', '50000-100000', '100000-200000', '200000-500000', '500000+']
      const intervalValues = []

      // Get values of all intervals except 500 000+
      for (let i = 0; i < (intervals.length - 1); i++) { // -1 because 500 000+ is not an owners interval in elastic.
        const intervalValue = await client.count({
          index: 'steam',
          query: {
            match: {
              owners: intervals[i]
            }
          }
        })
        intervalValues.push(intervalValue.count)
      }

      const aboveIntervals = await client.count({
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

      intervalValues.push(aboveIntervals.count)

      res.json({ barName: intervals, barValue: intervalValues })
    } catch (err) {
      console.log(err)
      next(createError(500))
    }
  }

  async test (req, res, next, client) {
    try {
      const response = await client.count({
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

      console.log(response)

      res.json(response)
    } catch (err) {
      console.log(err)
      next(createError(500))
    }
  }
}
