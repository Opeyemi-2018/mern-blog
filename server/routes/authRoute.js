import express from 'express'
import { signUp } from '../controlers/authControllers.js'

let router = express.Router()

router.post('/signup', signUp)

export default router