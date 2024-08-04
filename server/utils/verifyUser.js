import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export let verifyToken = async (req, res, next) => {
    let token = req.cookies.access_token
    if(!token) {
        return next(errorHandler(401, 'unauthorised'))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return next(errorHandler(401, 'unauthorized'))
        }
        req.user = user;
        next()
    })
}