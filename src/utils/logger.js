const winston = require('winston');

const level = process.env.LOG_LEVEL || 'info';

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level,
      filename: `./logs/${process.env.NODE_ENV}.log`,
      maxsize: 5242880,
      maxFiles: 3,
    }),
    new winston.transports.Console({
      level: 'debug',
      colorize: true,
      handleExceptions: true,
      json: false,
    }),
  ],
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
},

module.exports = logger;
