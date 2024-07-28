import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

let app = express()

mongoose.connect(process.env.MONGO)
  .then(() => {
      app.listen(3000, ()=> console.log('connected to database'))  })
  .catch((err) => console.log(err))

