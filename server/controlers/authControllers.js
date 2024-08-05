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

        let token = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET)
        let {password: pass, ...rest} = validUser._doc

        res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)
    } catch (error) {
        next(error)
    }

}

export let google = async (req, res, next) => {
    let {email, name, googlePhotoUrl} = req.body
    try {
        let user = await User.findOne({email})
        if(user){
            let token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET)
            let {password, ...rest} = user._doc
            res.status(200).cookie('access_token', token, {httpOnly: true})
            .json(rest)
        } else {
            let generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            let hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            let newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).split(-4),
                email, password: hashedPassword, profilePicture: googlePhotoUrl
            })
            await newUser.save()
            let token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET)
            let {password, ...rest} = newUser._doc;
            res.status(200).cookie('access_token', token, {httpOnly: true})
            .json(rest)
        }
    } catch (error) { 
       next(error)
    }
}