const winston = require('winston');

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
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
