/**
 * Module represents elastic search controller.
 */

import createError from 'http-errors'
import { Client } from '@elastic/elasticsearch'
import fs from 'fs'

/**
 * Class represents elastic search controller.
 */
export class ElasticSearchController {
  index (req, res, next, client) {
    try {
      async function run () {
        const result = await client.search({
          index: 'steam',
          query: {
            match: {
              name: 'counter strike'
            }
          }
        })
        console.log(result.hits.hits)
      }

      run().catch(console.log)

      res.render('body/startPage')
    } catch (err) {
      next(createError(500))
    }
  }
}
