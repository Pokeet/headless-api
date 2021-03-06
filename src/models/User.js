const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', function (next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }

      bcrypt.hash(user.password, salt, (err2, hash) => {
        if (err2) {
          return next(err2)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

UserSchema.methods.toJSON = function () {
  let user = this.toObject()
  delete user.password
  return user
}

module.exports = mongoose.model('User', UserSchema)
