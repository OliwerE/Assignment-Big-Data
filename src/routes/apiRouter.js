/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { ApiController } from '../controllers/apiController.js'
import { elasticClient } from '../config/elasticSearch.js'

export const router = express.Router()

const controller = new ApiController()

router.get('/owners-per-game', (req, res, next) => controller.ownersPerGame(req, res, next, elasticClient))
router.get('/game-prices', (req, res, next) => controller.gamePrices(req, res, next, elasticClient))

router.use('*', (req, res, next) => next(createError(404)))
