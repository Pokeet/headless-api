import mongoose from 'mongoose';
import config from '../../config';

mongoose.Promise = global.Promise;

// connect to db

const uri = `mongodb://${config.dbSettings.host}/${config.dbSettings.name}`;

module.exports = {
  init: function () {
    return new Promise((resolve, reject) => {
      mongoose.connect(uri)
        .then(() => {
          resolve(mongoose.connection);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  close: function () {
    return new Promise((resolve, reject) => {
      mongoose.connection.close()
        .then(() => {
          mongoose.connection = null;
          resolve();
        })
        .catch(() => reject());
    });
  },

  getConnection: function () {
    return mongoose.connection;
  },
};
