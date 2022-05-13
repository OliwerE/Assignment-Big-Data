/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { ElasticSearchController } from '../controllers/elasticSearchController.js'

export const router = express.Router()

const controller = new ElasticSearchController()

router.get('/', controller.index)

router.use('*', (req, res, next) => next(createError(404)))
