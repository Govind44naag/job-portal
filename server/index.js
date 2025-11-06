// const express=require('express') old way write module in type for use express like import
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'

dotenv.config({})
connectDB()

const app=express()


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// trust proxy for secure cookies behind Vercel/Proxies
app.set('trust proxy', 1)

// Allow multiple origins (local + Vercel). Set CLIENT_ORIGINS as comma-separated list.
const allowedOrigins = ( process.env.CLIENT_ORIGINS )
  .split(',')
  .map(o => o.trim())
  .filter(Boolean)

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
const PORT=process.env.PORT ||3000


//api's
app.use('/api/v1/user',userRoute)//user is okay
app.use('/api/v1/company',companyRoute)//company is okay
app.use('/api/v1/job',jobRoute)//job route is okay
app.use('/api/v1/application',applicationRoute)
//jj


app.listen(Port,()=>{
    console.log(`Server is Running on Port number ${PORT}`)//``this sign  is called tample literal
})
