/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { ApiController } from '../controllers/apiController.js'
import { client } from '../config/elasticSearch.js'

export const router = express.Router()

const controller = new ApiController()

router.get('/', (req, res, next) => controller.index(req, res, next, client))

router.use('*', (req, res, next) => next(createError(404)))
