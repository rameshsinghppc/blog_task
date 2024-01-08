const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Article = sequelize.define('Article', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    article_heading: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    article_description: {
        type: DataTypes.STRING(2000),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
}, {
    tableName: 'article',
    timestamps: false,
});

module.exports = Article;

