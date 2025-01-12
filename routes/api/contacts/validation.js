const Joi = require('joi');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.number().integer().min(3).max(9999999999).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),

  phone: Joi.number().integer().min(3).max(9999999999).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .optional(),
}).or('name', 'phone', 'email');


const schemaStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
  name: Joi.string().min(3).max(30).optional(),

  phone: Joi.number().integer().min(3).max(9999999999).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .optional(),
}).or('favorite', 'name', 'phone', 'email');


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
  validateContact: async (req, res, next) => {
    return await validate(schemaCreateContact, req.body, next);
  },
  validateBody: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next);
  },
  validateStatus: async (req, res, next) => {
    return await validate(schemaStatusContact, req.body, next);
  },
};

