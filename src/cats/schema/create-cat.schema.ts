import * as Joi from '@hapi/joi';

export const createCatSchema = Joi.object().keys({
  name: Joi.string().required(),
  age: Joi.number()
    .integer()
    .min(0)
    .max(100)
    .required(),
  breed: Joi.string().required(),
});
