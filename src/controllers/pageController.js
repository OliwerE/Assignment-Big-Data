/**
 * Module represents page controller.
 */

import createError from 'http-errors'

/**
 * Class represents page controller.
 */
export class PageController {
  async index (req, res, next) {
    try {
      console.log('test')
      res.render('body/startPage')
    } catch (err) {
      next(createError(500))
    }
  }
}
