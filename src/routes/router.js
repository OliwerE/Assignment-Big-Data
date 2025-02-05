/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { router as apiRouter } from './apiRouter.js'
import { router as pageRouter } from './pageRouter.js'

export const router = express.Router()

router.use('/api', apiRouter)
router.use('/', pageRouter)

router.use('*', (req, res, next) => next(createError(404)))
