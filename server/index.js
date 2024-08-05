import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoute.js'
import postRoute from './routes/postRoute.js'
import cookieParser from 'cookie-parser'

dotenv.config()

let app = express()
app.use(cookieParser())
app.use(express.json())
mongoose.connect(process.env.MONGO)
  .then(() => {
      app.listen(3000, ()=> console.log('connected to database'))  })
  .catch((err) => console.log(err))

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoute)



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

