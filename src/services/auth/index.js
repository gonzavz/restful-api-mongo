const authenticate = (req, res, next) => {
  const authorization = req.get('Authorization');
  if (authorization !== process.env.AUTHORIZATION_TOKEN) {
    return res.sendStatus(401);
  }
  next();
};

module.exports = authenticate;
