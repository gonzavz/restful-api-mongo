const express = require('express');
const {celebrate, Joi} = require('celebrate');
const create = require('./create');
const router = express.Router();

router.post('/', celebrate({
  body: Joi.object().keys({
    user: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()),
  }),
}), create);

module.exports = router;
