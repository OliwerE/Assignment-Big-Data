/**
 * Module represents Temp Controller
 */

import createError from 'http-errors'

/**
 * Class represents auth controller.
 */
export class TempController {
  index (req, res, next) {
    try {
      res.render('body/startPage')
    } catch (err) {
      next(createError(500))
    }
  }
}
