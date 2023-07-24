const { Grupo, Jogo, Participante, Desafio, Opcao, Dinamica } = require('../models/models');

// CRUD Controllers
class GruposController {
    getGrupos = async (req, res, next) => {
        try {
            const query = req.query;
            query.ativo = true

            const grupos = await Grupo.findAll({
                include: [
                    { model: Jogo, include: "dinamica" },
                    {
                        model: Participante, where: { ativo: true },
                        required: false
                    }
                ],
                where: query,
                order: [['id', 'ASC']]
            })
            res.status(200).json({ content: grupos });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    getGrupo = async (req, res, next) => {
        try {
            const grupoId = req.params.grupoId;
            const grupo = await Grupo.findByPk(grupoId,
                {
                    include: [
                        {
                            model: Jogo,
                            include: [
                                { model: Dinamica },
                                {
                                    model: Desafio,
                                    include:"opcoes"
                                    
                                }
                            ],
                            order: [['id', 'ASC']]
                        },
                        {
                            model: Participante,
                            where: { ativo: true },
                            required: false,
                            include: "resposta"
                        }
                    ],
                })
            if (!grupo) {
                return res.status(404).json({ message: 'Grupo not found!' });
            }
            res.status(200).json({ content: grupo });
        } catch (error) {
            console.log(error)
            next(error);
        }

    }

    createGrupo = async (req, res, next) => {
        try {
            const { data, cliente, monitor, jogoId } = req.body;

            const result = await Grupo.create({
                data: data,
                cliente: cliente,
                monitor: monitor,
                jogoId: jogoId,
                ativo: true
            })
            res.status(201).json({
                message: 'Grupo created successfully!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    updateGrupo = async (req, res, next) => {
        try {
            const grupoId = req.params.grupoId;
            const payload = req.body;

            const grupo = await Grupo.findByPk(grupoId)
            if (!grupo) {
                return res.status(404).json({ message: 'Grupo not found!' });
            }
            for (const key of Object.keys(payload)) {
                if (grupo[key])
                    grupo[key] = payload[key]
            }

            const result = await grupo.save();
            res.status(200).json({
                message: 'Grupo updated!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    deleteGrupo = async (req, res, next) => {
        try {
            const grupoId = req.params.grupoId;

            const grupo = await Grupo.findByPk(grupoId)
            if (!grupo) {
                return res.status(404).json({ message: 'Grupo not found!' });
            }

            const result = await Grupo.destroy({
                where: {
                    id: grupoId
                }
            });

            res.status(200).json({
                message: 'Grupo deleted!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

module.exports = new GruposController()