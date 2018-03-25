const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {errors} = require('celebrate');
const logger = require('./utils/logger');
const services = require('./services');
const mongooseValidationError = require('./midlewares/mongooseValidationError');
const app = express();

// Configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add morgan midleware combined with winston for http request logging.
app.use(morgan('combined', {stream: logger.stream}));
app.use(services.auth);
app.use('/users', services.users);
app.use('/', (req, res) => res.json({message: 'restful api v1.0.0'}));
app.use(errors());
app.use(mongooseValidationError);
module.exports = app;
