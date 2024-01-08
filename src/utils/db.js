const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DBNAME,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
    }
);

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
