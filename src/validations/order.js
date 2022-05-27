const Joi = require('joi');
function validateUser(userData) {
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(3).max(30).required(),
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
