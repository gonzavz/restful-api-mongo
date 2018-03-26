const Article = require('../../models/Article');

const handler = (req, res, next) => {
   const article = new Article(req.body);
   article.save()
    .then((newArticle) => res.json(newArticle))
    .catch(next);
};

module.exports = handler;
