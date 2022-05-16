/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { PageController } from '../controllers/pageController.js'

export const router = express.Router()

const controller = new PageController()

router.get('/', controller.index)

router.use('*', (req, res, next) => next(createError(404)))
