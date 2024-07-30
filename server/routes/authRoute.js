import express from 'express'
import { signUp, SignIn } from '../controlers/authControllers.js'

let router = express.Router()

router.post('/signup', signUp)
router.post('/signin', SignIn)

export default router