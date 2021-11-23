const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { HttpCode } = require('./helpers/constans');

const authRouter = require('./routes/api/users/users')
const contactsRouter = require('./routes/api/contacts/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use('/api/users', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(HttpCode.SERVER_ERROR).json({ status: 'fail', code: HttpCode.SERVER_ERROR, message: err.message })
})

module.exports = app
