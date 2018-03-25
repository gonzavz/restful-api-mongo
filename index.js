const app = require('./src/app');

const port = process.env.PORT || 3000;

// start the server
app.listen(port, () => {
  logger.info(`RESTful API server running on PORT ${port}`);
});
