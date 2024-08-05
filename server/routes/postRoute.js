import express from 'express'
import {verifyToken} from '../utils/verifyUser.js'
import { create } from '../controlers/postControllers.js'


let router = express.Router()

router.post('/create', verifyToken, create)

export default router