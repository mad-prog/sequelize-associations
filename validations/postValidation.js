const Joi = require("joi");

const updatePostSchema = Joi.object({
  title: Joi.string().max(35),
  content: Joi.string(),
});

module.exports = { updatePostSchema };
