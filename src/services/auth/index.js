const authenticate = (req, res, next) => {
  const authorization = req.get('Authorization');
  if (authorization !== process.env.AUTHORIZATION_TOKEN) {
    return res.status(401).json({message: 'Unauthorize'});
  }
  next();
};

module.exports = authenticate;
