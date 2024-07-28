import {User} from '../models/usersModel.js'
import bcryptjs from 'bcryptjs'

export let signUp = async (req, res) => {
    let {username, email, password} = req.body
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({message: 'all fields required'})
    } 

    let hashPassword = bcryptjs.hashSync(password, 10)

    let newUser = new User({username, email, password: hashPassword})

    try {   
        await newUser.save()
        res.json('user successfuly sign up')
    } catch (error) {
         res.status(500).json({message: error.message})
    }
}