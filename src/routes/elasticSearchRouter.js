/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { ElasticSearchController } from '../controllers/elasticSearchController.js'
import { client } from '../config/elasticSearch.js'

export const router = express.Router()

const controller = new ElasticSearchController()

router.get('/', (req, res, next) => controller.index(req, res, next, client))

router.use('*', (req, res, next) => next(createError(404)))
