const mongoose = require('mongoose')

require("dotenv").config()

mongoose
    .connect(`mongodb+srv://dbyash:${process.env.password}@porjectdb.gs8nc.mongodb.net/blogit?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true})
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db