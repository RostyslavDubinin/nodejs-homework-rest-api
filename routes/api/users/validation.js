const Joi = require('joi');

const schemaCreateUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .optional(),
  password: Joi.string().required(),
}).or('email', 'password'); 

const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .optional(),
  password: Joi.string().required(),
}).or('email', 'password');

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (err) {
    console.log(err);
    next({ status: 400, message: err.message.replace(/"/g, "'") });
  }
};  

module.exports = {
  validateCreateUser: async (req, res, next) => {
    return await validate(schemaCreateUser, req.body, next);
  },
  validateLoginUser: async (req, res, next) => {
    return await validate(schemaLoginUser, req.body, next);
  },
};

