import express from 'express'
import bodyParser from 'body-parser'
import expressValidator from 'express-validator'
import cors from 'cors'

import config from '../config'
import routes from './routes'
import Auth from './middlewares/Auth'
import Database from './middlewares/Database'

const app = express()

// database init

Database.init()

// middlewares

app.use(cors({ origin: '*' }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(expressValidator({
  customValidators: {
  }
}))

// initialize auth

app.use(Auth.init())

// routing

app.use(`/api/${config.apiVersion}`, routes)

// error handlers

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

let port = process.env.PORT

console.log('Listening to port ' + port)
app.listen(port)

module.exports = app
