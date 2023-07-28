const { Participante, Resposta } = require('../models/models');

// CRUD Controllers
class ParticipantesController {
    getParticipantes = async (req, res, next) => {
        try {
            const query = req.query;
            query.ativo = true

            const participantes = await Participante.findAll({
                include: [
                    { model: Resposta }
                ],
                where: query,
                order: [['id', 'ASC']]
            })
            res.status(200).json({ content: participantes });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    getParticipante = async (req, res, next) => {
        try {
            const participanteId = req.params.participanteId;
            const participante = await Participante.findByPk(participanteId,
                {
                    include: [
                        { model: Resposta }
                    ]
                })
            if (!participante) {
                return res.status(404).json({ message: 'Participante not found!' });
            }
            res.status(200).json({ content: participante });
        } catch (error) {
            console.log(error)
            next(error);
        }

    }

    createParticipante = async (req, res, next) => {
        try {
            const { email, nome, grupoId } = req.body;

            const result = await Participante.create({
                nome: nome,
                email: email,
                grupoId: grupoId,
                ativo: true
            })
            res.status(201).json({
                message: 'Participante created successfully!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    updateParticipante = async (req, res, next) => {
        try {
            const participanteId = req.params.participanteId;
            const payload = req.body;

            const participante = await Participante.findByPk(participanteId)
            if (!participante) {
                return res.status(404).json({ message: 'Participante not found!' });
            }

            for (const key of Object.keys(payload)) {
                if (key in participante)
                participante[key] = payload[key]
            }

            const result = await participante.save();
            res.status(200).json({
                message: 'Participante updated!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    deleteParticipante = async (req, res, next) => {
        try {
            const participanteId = req.params.participanteId;

            const participante = await Participante.findByPk(participanteId)
            if (!participante) {
                return res.status(404).json({ message: 'Participante not found!' });
            }

            const result = await Participante.destroy({
                where: {
                    id: participanteId
                }
            });

            res.status(200).json({
                message: 'Participante deleted!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

module.exports = new ParticipantesController()