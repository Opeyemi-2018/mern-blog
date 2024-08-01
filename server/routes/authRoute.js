import express from 'express'
import { signUp, SignIn, google } from '../controlers/authControllers.js'

let router = express.Router()

router.post('/signup', signUp)
router.post('/signin', SignIn)
router.post('/google', google)

export default router