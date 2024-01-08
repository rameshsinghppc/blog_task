const { sendErrorResponse } = require('../utils/commonResponse');
const { StatusCodes } = require('http-status-codes');

module.exports.validateRequest = schema => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return sendErrorResponse(res, StatusCodes.BAD_REQUEST, `Form validation error`, errorMessages);
        }

        req.validatedInput = value;
        next();
    };
};
