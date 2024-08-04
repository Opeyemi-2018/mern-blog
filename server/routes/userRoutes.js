import express  from 'express'
import { test, updateUser, deleteUser, signOut } from '../controlers/usersControllers.js'
import { verifyToken } from '../utils/verifyUser.js'

let router = express.Router()

router.get('/test', test)
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', signOut)

export default router