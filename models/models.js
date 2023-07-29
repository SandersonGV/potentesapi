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

const Cliente = database.define('cliente', {
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
    maxMonitores: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    maxGrupos: {
        type: Sequelize.INTEGER,
        allowNull: false,        
        defaultValue:0
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
    }
})

const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING,
    email: {
        type:Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING,
    tipo: Sequelize.INTEGER,
    ativo: Sequelize.BOOLEAN,
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
    inicio: {
        type: Sequelize.DATE,
        allowNull: true
    },
    termino: {
        type: Sequelize.DATE,
        allowNull: true
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

User.belongsTo(Cliente)
User.hasMany(Grupo)

Cliente.hasMany(User)
Cliente.hasMany(Grupo)

Grupo.belongsTo(Cliente)
Grupo.belongsTo(Jogo)
Grupo.belongsTo(User)
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

module.exports = { Dinamica, Jogo, Desafio, Opcao,Grupo,Participante,Resposta, database, Cliente, User };
