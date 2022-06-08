const express = require('express')
const app = express()
const ErrorHandler =require('./middleware/error')
const ProductRoutes =require('./routes/ProductRoutes')
const UserRoutes =require('./routes/UserRoutes')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',ProductRoutes)
app.use('/api/v2',UserRoutes)

app.use(ErrorHandler);

module.exports =app

