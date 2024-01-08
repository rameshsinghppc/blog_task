const bcrypt = require('bcrypt');
const Article = require('../models/articleModel');

const { StatusCodes } = require('http-status-codes');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/commonResponse');

async function createArticle(req, res, next) {
    try {
        const { heading, description } = req.validatedInput;

        const article = await Article.create(
            {
                article_heading: heading,
                article_description: description,
                user_id: req.user.user_id
            }
        );

        sendSuccessResponse(res, StatusCodes.CREATED, article, `Article created successfully`);
    } catch (err) {
        next(err);
    }
}

async function getArticle(req, res, next) {
    try {
        const id = req.params.id;
        if (id) {
            const article = await Article.findOne({
                where: {
                    id,
                    // user_id: req.user.user_id
                }
            });
            if (!article)
                return sendErrorResponse(res, StatusCodes.NOT_FOUND, 'Not found', 'Article not found')
            return sendSuccessResponse(res, StatusCodes.OK, { ...article?.dataValues }, `Article fetched successfully`);
        } else {
            const articles = await Article.findAll();
            return sendSuccessResponse(res, StatusCodes.OK, articles, `Article fetched successfully`);
        }

    } catch (err) {
        next(err);
    }
}

async function deleteArticle(req, res, next) {
    try {
        const id = req.params.id;

        const article = await Article.destroy({
            where: {
                id,
                user_id: req.user.user_id
            }
        });
        if (!article)
            return sendErrorResponse(res, StatusCodes.NOT_FOUND, 'Not found', 'Article not deleted')
        return sendSuccessResponse(res, StatusCodes.OK, { ...article?.dataValues }, `Article deleted successfully`);

    } catch (err) {
        next(err);
    }
}

async function updateArticle(req, res, next) {
    try {

        const { heading, description, id } = req.validatedInput;

        const [article] = await Article.update(
            {
                article_heading: heading,
                article_description: description,
            },
            {
                where: {
                    id,
                    user_id: req.user.user_id
                },
            }
        );
        if (article === 0)
            return sendErrorResponse(res, StatusCodes.BAD_REQUEST, 'Bad request', 'Article not updated')
        return sendSuccessResponse(res, StatusCodes.OK, { heading, description, }, `Article updated successfully`);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    createArticle,
    getArticle,
    deleteArticle,
    updateArticle
};
