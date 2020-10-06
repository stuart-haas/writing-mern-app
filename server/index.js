require('dotenv').config({ path: '../.config/.env' })
const express = require('express')
const bodyParser = require('body-parser')
const { findOne } = require('./src/controllers/user.controller')
const app = express()

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '0.0.0.0'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api', (req, res) => res.json({'hello': 'world'}))

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`)
})