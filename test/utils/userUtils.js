const JWT = require('jsonwebtoken')

const Database = require('../../src/middlewares/Database')

const User = require('../../src/models/User')

const API_SECRET = process.env.API_SECRET

var createdUsers = []

module.exports = {
  createTestUser: (credentials) => {
    return new Promise((resolve, reject) => {
      Database.init().then((connection) => {
        let user = new User({
          email: credentials.email,
          password: credentials.password
        })

        user.save(err => {
          if (err === null) {
            createdUsers.push(user)
            let token = JWT.sign({ createdUsers }, API_SECRET)
            resolve({
              user,
              token
            })
          } else {
            reject(new Error('Couldn\'t save test user ' + err))
          }
        })
      }).catch(err => {
        reject(new Error('Cannot init db : ' + err))
      })
    })
  },

  clearCreatedTestUsers: () => {
    while (createdUsers.length > 0) {
      let user = createdUsers.pop()
      User.deleteOne({
        _id: user._id
      }, err => {
        if (err != null) {
          console.error('Error deleting user : ' + err)
        }
      })
    }
  },

  getUserToken: (credentials) => {
    return new Promise((resolve, reject) => {
      User.findOne({
        email: credentials.email
      }, (err, user) => {
        if (err) reject(new Error('Authentication error : ' + err))
        if (!user) reject(new Error('User is null'))
        if (!err && user) {
          const token = JWT.sign({ user }, API_SECRET)
          resolve(token)
        }
      })
    })
  }
}
