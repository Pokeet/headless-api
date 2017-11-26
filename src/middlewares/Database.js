import mongoose from 'mongoose'
import config from '../../config'

mongoose.Promise = global.Promise

// connect to db

const uri = `mongodb://${config.dbSettings.user}:${config.dbSettings.password}@${config.dbSettings.host}/${config.dbSettings.name}`

module.exports = {
  init: function () {
    return new Promise((resolve, reject) => {
      mongoose.connect(uri, {
        useMongoClient: true
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
