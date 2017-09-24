import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import cors from 'cors';
import mongoose from 'mongoose';

import config from '../config';
import routes from './routes';
import Auth from './middlewares/Auth';

const app = express();

mongoose.Promise = global.Promise;

// connect to db

const uri = `mongodb://${config.dbSettings.host}/${config.dbSettings.name}`;

mongoose.connect(uri)
  .then(() => console.log('Connected to db with success'))
  .catch(err => console.error(err));

const db = mongoose.connection;

// middlewares

app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator({
  customValidators: {
  },
}));

// initialize auth

app.use(Auth.init());

// routing

app.use(`/api/${config.apiVersion}`, routes);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

app.listen(3000);

module.exports = app;
