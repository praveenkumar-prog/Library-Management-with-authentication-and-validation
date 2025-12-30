const Joi = require("joi");

const userJoiSchema = Joi.object({
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  age: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  mobile: Joi.number().required(),
  address: Joi.string().max(100).required(),
  gender: Joi.string().valid("male", "female").required(),
  password: Joi.string().min(6).required(),
});

module.exports = userJoiSchema;
