const express = require('express')
const app = express()
const ErrorHandler =require('./middleware/error')
const ProductRoutes =require('./routes/ProductRoutes')
const OderRoutes =require('./routes/OderRoutes')
const UserRoutes =require('./routes/UserRoutes')
const cors = require('cors')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

const logger = function (req, res, next) {
    console.log(`http://localhost:7300${req.url}`)
    next()
  }
  
  app.use(logger)


app.use(cors({
    origin: 'http://localhost:3000',
    methods:'GET,POST,PUT,PATCH,DELETE',
    credentials:true
  }))

app.use('/api/v1',ProductRoutes)
app.use('/api/v2',UserRoutes)
app.use('/api/v3',OderRoutes)

app.use(ErrorHandler);

module.exports =app

