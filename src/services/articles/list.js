const Article = require('../../models/Article');

const buildOptions = ({limit, offset}) => ({
  limit,
  offset,
  order: {
    title: 'asc',
  },
  populate: ['user'],
});

const handler = (req, res, next) => {
    const tags = req.query.tags;
    Article.paginate({tags}, buildOptions(req.query))
      .then(({docs, total}) => res.json({articles: docs, total}))
      .catch(next);
};

module.exports = handler;
