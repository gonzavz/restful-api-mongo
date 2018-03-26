const express = require('express');
const {celebrate, Joi} = require('celebrate');
const create = require('./create');
const remove = require('./remove');
const list = require('./list');
const router = express.Router();

router.post('/', celebrate({
  body: Joi.object().keys({
    user: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()),
  }),
}), create);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    // validate that the params fit to a posible ObjectId.
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'Valid ObjectId').required(),
  }),
}), remove);

router.get('/', celebrate({
  query: {
    limit: Joi.number().default(10),
    offset: Joi.number().default(0),
    tags: Joi.string().default(''),
  },
}), list);

module.exports = router;
