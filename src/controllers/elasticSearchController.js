/**
 * Module represents elastic search controller.
 */

import createError from 'http-errors'

/**
 * Class represents elastic search controller.
 */
export class ElasticSearchController {
  index (req, res, next) {
    try {
      res.render('body/startPage')
    } catch (err) {
      next(createError(500))
    }
  }
}
