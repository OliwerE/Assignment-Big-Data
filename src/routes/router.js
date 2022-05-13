/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { router as elasticSearchRouter } from './elasticSearchRouter.js'

export const router = express.Router()

router.use('/', elasticSearchRouter)

router.use('*', (req, res, next) => next(createError(404)))
