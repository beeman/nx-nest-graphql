import * as Joi from '@hapi/joi'

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').required(),
  HOST: Joi.string().alphanum().default('localhost'),
  PORT: Joi.number().default(7900),
})
