import {User} from '../models/usersModel.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'


export let signUp = async (req, res, next) => {
    let {username, email, password} = req.body
    if(!username || !email || !password || username === '' || email === '' || password === ''){
         next(errorHandler(400, 'all fields are required'))
    } 
    let hashPassword = bcryptjs.hashSync(password, 10)
    let newUser = new User({username, email, password: hashPassword})

    try {   
        await newUser.save()
        res.json('user successfuly sign up')
    } catch (error) {
        next(error)
    }
}