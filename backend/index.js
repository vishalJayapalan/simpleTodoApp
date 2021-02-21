const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const todoRoute = require('./todo/router')

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/todo', todoRoute)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
