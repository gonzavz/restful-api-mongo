const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./src/utils/logger');

const port = process.env.PORT || 3000;

const app = express();

// Configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add morgan midleware combined with winston for http request logging.
app.use(morgan('combined', {stream: logger.stream}));

app.use('/', (req, res) => res.json('restful api v1.0.0'));

// start the server
app.listen(port, () => {
  logger.info(`RESTful API server running on PORT ${port}`);
});
