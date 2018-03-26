const Article = require('../../models/Article');

const buildOptions = ({limit, offset}) => ({
  limit,
  offset,
  order: {
    title: 'asc',
  },
  populate: ['user'],
});

const buildQuery = ({tags}) => {
  const tagsArray = tags.split(',');
  const query = {};
  if (tagsArray.legnth > 0) {
    Object.assign(query, {tags: {$in: tags}});
  }
  return query;
};

const handler = (req, res, next) => {
    Article.paginate(buildQuery(req.query), buildOptions(req.query))
      .then(({docs, total}) => res.json({articles: docs, total}))
      .catch(next);
};

module.exports = handler;
