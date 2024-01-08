const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const { StatusCodes } = require('http-status-codes');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/commonResponse');
const { generateAccessToken } = require('../middlewares/auth');

async function registerUser(req, res, next) {
    try {
        const { fname, lname, email, password } = req.validatedInput;
        const existingUser = await User.findOne({
            where: { email },
        });

        if (existingUser) {
            return sendErrorResponse(res, StatusCodes.CONFLICT, `Conflict`, `Email : '${email}' is already taken`);
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({ fname, lname, email, password: hashedPassword });

        sendSuccessResponse(res, StatusCodes.CREATED, { email: newUser.email }, `User created successfully`);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.validatedInput;
        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return sendErrorResponse(res, StatusCodes.UNAUTHORIZED, `Unauthorized`, `Email : '${email}' is not registered`);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return sendErrorResponse(res, StatusCodes.UNAUTHORIZED, `Unauthorized`, `Wrong password`);
        }

        const userData = {
            firstName: user.fname,
            lastName: user.lname,
            email: user.email,
            user_id: user.id
        };

        const accessToken = generateAccessToken(userData);

        return sendSuccessResponse(res, StatusCodes.OK, { ...userData, accessToken }, `Login successful`);
    } catch (err) {
        next(err);
    }
}

async function userProfile(req, res, next) {
    try {
        const { email } = req.user;
        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return sendErrorResponse(res, StatusCodes.NOT_FOUND, `Not Found`, `Email : '${email}' is not found`);
        }

        const userData = {
            firstName: user.fname,
            lastName: user.lname,
            email: user.email,
        };


        return sendSuccessResponse(res, StatusCodes.OK, userData, `Profile fetched successfully`);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    registerUser,
    login,
    userProfile
};
