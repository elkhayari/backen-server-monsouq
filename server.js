const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

//app.use(cors()) 
app.use(express.json())

//connect to mongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_KEY}@cluster0-gukeg.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

//const exercicesRouter = require('./routes/exercises')
const productRouter = require('./routes/products')

//app.use('/exercises', exercicesRouter)
app.use('/products', productRouter)

app.listen(port, '192.168.1.28', () =>{
    console.log(`server is running on port: ${port}.`)
})