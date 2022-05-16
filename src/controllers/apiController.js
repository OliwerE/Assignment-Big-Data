/**
 * Module represents API controller.
 */

import createError from 'http-errors'
import { Client } from '@elastic/elasticsearch'
import fs from 'fs'

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
      const names = ['0-20000', '20-50000', '50000-100000', '100000-200000', '200000-500000', 'Other']
      const values = [18596, 3059, 1695, 1386, 1272, 1067]


      // ToDo get data from elastic


      res.json({ barName: names, barValue: values })
    } catch (err) {
      next(createError(500))
    }
  }

  async index (req, res, next, client) {
    try {
      const result = await client.search({
        index: 'steam',
        query: {
          match: {
            name: 'counter strike'
          }
        }
      })
      res.json({ result: result.hits.hits })
      // client.count() // count documents
    } catch (err) {
      next(createError(500))
    }
  }
}
