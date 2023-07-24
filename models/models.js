const Sequelize = require('sequelize');
const database = require('../util/database');

const Dinamica = database.define('dinamica', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
    }
})

const Jogo = database.define('jogo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
    }
})

const Desafio = database.define('desafio', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
    }
})

const Opcao = database.define('opcao', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    valor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
    }
});

const Grupo = database.define('grupo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    cliente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    monitor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,        
        defaultValue:1
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
    }
})

const Participante = database.define('participante', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
    }
})

const Resposta = database.define('resposta', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    valor: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//associacoes

Grupo.belongsTo(Jogo)
Grupo.hasMany(Participante)

Participante.belongsTo(Grupo)
Participante.hasMany(Resposta)

Dinamica.hasMany(Jogo)

Jogo.belongsTo(Dinamica)
Jogo.hasMany(Grupo)
Jogo.hasMany(Desafio)

Desafio.belongsTo(Jogo)
Desafio.Opcoes = Desafio.hasMany(Opcao, { as :"opcoes"})
Desafio.hasMany(Resposta)

Opcao.belongsTo(Desafio)

Resposta.belongsTo(Desafio)

module.exports = { Dinamica, Jogo, Desafio, Opcao,Grupo,Participante,Resposta, database };
