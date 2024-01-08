const Joi = require('joi');

const productSchemaJoi = {
    heading: Joi.string().max(300).required(),
    description: Joi.string().max(2000).required(),
};

const addProductSchemaJoi = Joi.object({ ...productSchemaJoi });

const updateProductSchemaJoi = Joi.object({
    id: Joi.number().required(),
    ...productSchemaJoi
});

module.exports = {
    addProductSchemaJoi,
    updateProductSchemaJoi
};
