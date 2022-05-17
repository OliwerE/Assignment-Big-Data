/**
 * Module represents page controller.
 */

import createError from 'http-errors'

/**
 * Class represents page controller.
 */
export class PageController {
  /**
   * Returns the start page.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {Function} next - Next function.
   */
  async index (req, res, next) {
    try {
      res.render('body/startPage')
    } catch (err) {
      next(createError(500))
    }
  }
}
