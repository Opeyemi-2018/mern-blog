import express  from 'express'
import { test } from '../controlers/usersControllers.js'

let router = express.Router()

router.get('/test', test)

export default router