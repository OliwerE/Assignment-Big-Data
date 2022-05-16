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
      res.json({ result:  result.hits.hits})

      // client.count() // count documents

    } catch (err) {
      next(createError(500))
    }
  }

  async testData (req, res, next, client) {
    try {
      const data = [100, 50, 300, 40, 350, 250]
      res.json(data)
    } catch (err) {
      next(createError(500))
    }
  }
}
