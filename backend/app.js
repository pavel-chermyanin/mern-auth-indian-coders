const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/user-routes')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use('/api', router)

mongoose.connect(
  "mongodb+srv://mern-auth-indian-coders:123@cluster0.g6hue.mongodb.net/mern-auth-indian-coders?retryWrites=true&w=majority"
).then(() => {
    app.listen(5000)
    console.log('DB is connected! Listening to localhost 5000')
}).catch((err) => {
    console.log(err)
});