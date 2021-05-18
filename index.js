const express = require('express');
const cors = require('cors')

const db = require('./db')
const blogRouter = require('./routes/blog_router')

const app = express()
const apiPort = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', blogRouter)

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'));
    const path = require("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    });
  }

app.listen(apiPort, () => console.log("server running"))