const logger = require('./src/utils/logger');
const mongoose = require('mongoose');
const app = require('./src/app');

const port = process.env.PORT || 3000;
const dbUri = process.env.MONGO_URI;

logger.info(`Starting RESTful Server. ENV=${process.env.NODE_ENV}`);

// set mongoose conneciton options
// avoid auto index on production.
const options = {
  autoIndex: process.env.NODE_ENV !== 'production',
};

// set mongoose promise
mongoose.Promise = global.Promise;
// connect to mongodb
logger.info('Connecting to Database');
mongoose.connect(dbUri, options)
  .then(() => {
    logger.info('Staring WEB server');
    // start the server
    app.listen(port, () => {
      logger.info(`RESTful API server running on PORT ${port}`);
    }).on('error', (error) => logger.error(error));
  })
  .catch((error) => logger.error(`Unable to connect to mongoDB due ${error}`));

module.exports = app;
