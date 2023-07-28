const { Cliente } = require('../models/models');

// CRUD Controllers
class ClientesController {
    getClientes = async (req, res, next) => {
        try {
            const query = req.query;
            query.ativo = true

            const clientes = await Cliente.findAll({
                where: query,
                order: [['id', 'ASC']]
            })
            res.status(200).json({ content: clientes });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    getCliente = async (req, res, next) => {
        try {
            const clienteId = req.params.clienteId;
            const cliente = await Cliente.findByPk(clienteId)
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente not found!' });
            }
            res.status(200).json({ content: cliente });
        } catch (error) {
            console.log(error)
            next(error);
        }

    }

    createCliente = async (req, res, next) => {
        try {
            const { nome, maxMonitores, maxGrupos } = req.body;

            const result = await Cliente.create({
                nome: nome,
                maxGrupos: maxGrupos,
                maxMonitores: maxMonitores,
                ativo: true
            })
            res.status(201).json({
                message: 'Cliente created successfully!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    updateCliente = async (req, res, next) => {
        try {
            const clienteId = req.params.clienteId;
            const payload = req.body;

            const cliente = await Cliente.findByPk(clienteId)
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente not found!' });
            }

            for (const key of Object.keys(payload)) {
                if (key in cliente)
                cliente[key] = payload[key]
            }

            const result = await cliente.save();
            res.status(200).json({
                message: 'Cliente updated!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    deleteCliente = async (req, res, next) => {
        try {
            const clienteId = req.params.clienteId;

            const cliente = await Cliente.findByPk(clienteId)
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente not found!' });
            }

            const result = await Cliente.destroy({
                where: {
                    id: clienteId
                }
            });

            res.status(200).json({
                message: 'Cliente deleted!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

module.exports = new ClientesController()