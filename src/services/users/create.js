const User = require('../../models/User');

const handler = (req, res, next) => {
  const user = new User(req.body);
  user.save()
    .then((newUser) => res.json(newUser))
    .catch(next);
};

module.exports = handler;
