const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const { userSchemaJoi, loginSchemaJoi } = require("../utils/userValidator")
const { validateRequest } = require("../utils/reqBodyValidate")
const { authenticateToken } = require("../middlewares/auth")

router.post('/register', validateRequest(userSchemaJoi), userController.registerUser);

router.post('/login', validateRequest(loginSchemaJoi), userController.login);

router.get('/get-profile', authenticateToken, userController.userProfile);

module.exports = router;
