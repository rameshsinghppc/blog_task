const express = require('express');
const router = express.Router();
const articleController = require("../controllers/articleController")
const { addProductSchemaJoi, updateProductSchemaJoi } = require("../utils/articleValidator")
const { validateRequest } = require("../utils/reqBodyValidate")
const { authenticateToken } = require("../middlewares/auth")

router.get('', articleController.getArticle);

router.get('/:id', articleController.getArticle);

router.post('', authenticateToken, validateRequest(addProductSchemaJoi), articleController.createArticle);

router.put('', authenticateToken, validateRequest(updateProductSchemaJoi), articleController.updateArticle);

router.delete('/:id', authenticateToken, articleController.deleteArticle);



module.exports = router;
