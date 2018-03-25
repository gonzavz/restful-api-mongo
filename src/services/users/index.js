const router = require('express').Router();
const create = require('./create');
const {celebrate, Joi} = require('celebrate');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    avatar: Joi.string(),
  }),
}), create);

module.exports = router;
