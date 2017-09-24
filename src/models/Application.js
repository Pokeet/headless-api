import mongoose from 'mongoose';

const { Schema } = mongoose;

module.exports = new Schema({
  name: String,
  description: String,
  appID: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});