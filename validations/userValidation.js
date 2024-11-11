import Joi from 'joi';

export const registerValidation = Joi.object({
  firstName: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.empty': 'First name is required',
      'string.min': 'First name should have at least 3 characters',
    }),

  lastName: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.empty': 'Last name is required',
      'string.min': 'Last name should have at least 3 characters',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email',
    }),

  password: Joi.string()
    .min(8)
    .pattern(new RegExp('[A-Z]'))
    .pattern(new RegExp('[a-z]'))
    .pattern(new RegExp('[0-9]'))
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    }),
});
