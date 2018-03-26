const Article = require('../../models/Article');
const NotFoundError = require('../../utils/errors/NotFoundError');

const handler = (req, res, next) => {
    const {id} = req.params;
    Article.findById(id).exec()
      .then((article) => {
        if (article) {
          article.set(req.body);
          article.save()
            .then((updated) => {
              res.json(updated);
            })
            .catch(next);
        } else {
          next(new NotFoundError());
        }
      })
      .catch(next);
};

module.exports = handler;
