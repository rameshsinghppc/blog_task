const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { sendErrorResponse } = require('../utils/commonResponse');

const accessSecretKey = process.env.JWT_ACCESS_SECRET_KEY;


// Function to generate an access token
const generateAccessToken = user => {
    return jwt.sign(user, accessSecretKey, { expiresIn: '1d' });
};


// Middleware for token authentication and authorization
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return sendErrorResponse(res, StatusCodes.UNAUTHORIZED, `Unauthorized`, `Token missing`);
    }

    if (!token.startsWith('Bearer ')) {
        return sendErrorResponse(res, StatusCodes.UNAUTHORIZED, `Unauthorized `, `Invalid token format`);
    }

    const authToken = token.slice(7);

    jwt.verify(authToken, accessSecretKey, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return sendErrorResponse(res, StatusCodes.UNAUTHORIZED, `Unauthorized`, `Token expired`);
            }
            return sendErrorResponse(res, StatusCodes.FORBIDDEN, `Forbidden`, `Invalid token`);
        }

        req.user = user;
        next();
    });
};

module.exports = {
    generateAccessToken,
    authenticateToken,
};
