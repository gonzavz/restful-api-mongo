const Article = require('../../models/Article');
const NotFoundError = require('../../utils/errors/NotFoundError');

const handler = (req, res, next) => {
  const {id} = req.params;
  Article.findByIdAndRemove(id).exec()
    .then((removed) => removed ? res.json(removed):next(new NotFoundError()))
    .catch(next);
};

module.exports = handler;
