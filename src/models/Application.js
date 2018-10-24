const mongoose = require('mongoose')

const { Schema } = mongoose

const ApplicationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  users: {
    type: [{
      userId: Schema.Types.ObjectId,
      role: String
    }],
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

module.exports = mongoose.model('Application', ApplicationSchema)
