const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {errors} = require('celebrate');
const logger = require('./utils/logger');
const services = require('./services');
const NotFoundError = require('./utils/errors/NotFoundError');
const mongooseErrorHandler = require('./midlewares/mongooseErrorHandler');
const customErrorHanlder = require('./midlewares/customValidationErrorHandler');
const notFoundErrorHanlder = require('./midlewares/notFoundErrorHandler');
const errorHandler = require('./midlewares/errorHandler');
const errorLogger = require('./midlewares/errorLogger');
const app = express();

// Configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add morgan midleware combined with winston for http request logging.
app.use(morgan('tiny', {stream: logger.stream}));

// Add healthcheck endpoint.
app.get('/ping', (req, res) => res.json({message: 'restful api v1.0.0'}));

// Add Services
app.use(services.auth);
app.use('/users', services.users);
app.use('/articles', services.articles);

// If not found throw a custom NotFoundError
app.use((req, res, next) => next(new NotFoundError()));

// Log Errors
app.use(errorLogger);

// Add celebrate error handler
app.use(errors());

// Add Custom errors handlers
app.use(notFoundErrorHanlder,
  mongooseErrorHandler,
  customErrorHanlder,
  errorHandler
);

module.exports = app;
