/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { TempController } from '../controllers/tempController.js'

export const router = express.Router()

const controller = new TempController()

router.get('/', controller.index)

router.use('*', (req, res, next) => next(createError(404)))
