const express = require('express');
require('express-async-errors');

const config = require('config');
const morgan = require('morgan');

const bodyParser = require('./../middlewares/bodyParser');
const errorHandler = require('./../middlewares/errorHandler');
const routes = require('./routes');

const app = express();

module.exports = () => {
  app.get('/health', (req, res) => res.status(200).send('ok'));

  if (config.env === 'local') app.use(morgan('dev'));

  bodyParser(app);

  routes(app);

  app.use(errorHandler);

  return app;
};
