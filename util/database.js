const Sequelize = require('sequelize');
require('dotenv').config()
const { DB_TYPE, DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env

const sequelizeOptions = {
    host: DB_HOST,
    dialect: 'postgres',

}
if (DB_TYPE == "ssl") {
    sequelizeOptions.dialectOptions = {
        ssl: {
            require: false,
            rejectUnauthorized: false
        }
    }
}


const sequelize = new Sequelize(
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    sequelizeOptions
);

module.exports = sequelize;