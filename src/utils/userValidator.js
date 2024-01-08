const Joi = require('joi');

// Define a custom Joi schema for password validation with separate messages
const passwordSchema = Joi.string()
    .pattern(/^(?=.*[a-z])/)
    .message('Password must contain at least one lowercase letter.')
    .pattern(/^(?=.*[A-Z])/)
    .message('Password must contain at least one uppercase letter.')
    .pattern(/^(?=.*\d)/)
    .message('Password must contain at least one digit.')
    .pattern(/^(?=.*[@$!%*?&])/)
    .message('Password must contain at least one special character (@ $ ! % * ? &).')
    .min(8)
    .max(20)
    .message('Password must be between 8 and 20 characters long.');

// Joi schema for user input validation with custom messages
const userSchemaJoi = Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: passwordSchema.required()
});

const loginSchemaJoi = Joi.object({
    email: Joi.string().email().required(),
    password: passwordSchema.required()
});

module.exports = {
    userSchemaJoi,
    loginSchemaJoi
};
