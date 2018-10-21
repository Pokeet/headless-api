const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// connect to db

const mongoUser = process.env.MONGO_USER_NAME
const mongoPassword = process.env.MONGO_PASSWORD
const mongoHost = process.env.MONGO_HOST
const mongoDbName = process.env.MONGO_DB_NAME

const uri = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}/${mongoDbName}`

module.exports = {
  init: function () {
    return new Promise((resolve, reject) => {
      mongoose.connect(uri, {
        useNewUrlParser: true
      })
        .then(() => {
          resolve(mongoose.connection)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  close: function () {
    return new Promise((resolve, reject) => {
      mongoose.connection.close()
        .then(() => {
          resolve()
        })
        .catch((err) => reject(err))
    })
  },

  getConnection: function () {
    let connection = mongoose.connection
    return connection
  }
}
