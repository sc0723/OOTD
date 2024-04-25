require('dotenv').config()
const express = require('express')
const outfitRoutes = require('./routes/outfits')
const mongoose = require('mongoose')

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/outfits', outfitRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error)=> {
        console.log(error)
    })

