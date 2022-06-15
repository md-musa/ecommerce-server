const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

function validateUser(userData) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: new PasswordComplexity({
      min: 6,
      max: 25,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 2,
    }),
  });
  return schema.validate(userData);
}

function validateLoginUser(userData) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: new PasswordComplexity({
      min: 6,
      max: 25,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 2,
    }),
  });
  return schema.validate(userData);
}
module.exports = { validateUser, validateLoginUser };
