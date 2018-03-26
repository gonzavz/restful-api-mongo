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
    const query = {};
    const tags = req.query.tags;
    console.log('This are the tags', tags);
    if (tags) {
      if(Array.isArray(tags)) {
        Object.assign(query, {
          "tags": {
            $in: tags
          }
        });
      } else {
        Object.assign(query, {tags});
      }
    }
    console.log('the query', query);
    Article.paginate(query, buildOptions(req.query))
      .then(({docs, total}) => res.json({articles: docs, total}))
      .catch(next);
};

module.exports = handler;
