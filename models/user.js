const Sequelize = require('sequelize');
const database = require('../util/database');

const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    tipo: Sequelize.INTEGER,
    ativo: Sequelize.BOOLEAN,
});

module.exports = User;