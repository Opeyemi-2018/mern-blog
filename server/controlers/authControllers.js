import {User} from '../models/usersModel.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

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

export let SignIn = async (req, res, next) => {
    let {email, password} = req.body
    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, 'all fields is required')) 
    }
    try {
        let validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404, 'User not found'))

        let validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return errorHandler(400, 'invalid credentials')

        let token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        let {password: pass, ...rest} = validUser._doc

        res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)
    } catch (error) {
        next(error)
    }

}