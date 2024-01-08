function sendSuccessResponse(res, statusCode, data, message = 'Success') {
    res.status(statusCode).json({
        status: 'success',
        statusCode: statusCode,
        message,
        data
    });
}

function sendErrorResponse(res, statusCode, message, error = null) {
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        error
    });
}

module.exports = { sendSuccessResponse, sendErrorResponse };
