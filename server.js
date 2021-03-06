const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });


/* new thing */
// API routes
require('./routes')(app);


/* Set up Mongoose */
// connect to mongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_KEY}@cluster0-gukeg.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

//const exercicesRouter = require('./routes/exercises')
const productRouter = require('./routes/products')
app.use('/products', productRouter)

// require category
const categoryRouter = require('./routes/categories')
app.use('/categories', categoryRouter)




app.listen(port ,() =>{
    console.log(`server is running on port: ${port}. ${process.env.MONGODB_KEY}`)
})
