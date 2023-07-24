const { Jogo,Desafio } = require('../models/models');

// CRUD Controllers
class JogosController {
    getJogos = async (req, res, next) => {
        try {
            const query = req.query;
            query.ativo=true

            const jogos = await Jogo.findAll({
                include: [
                    { model: Desafio }
                ],
                where: query,
                order: [['id', 'ASC']]
            })
            res.status(200).json({ content: jogos });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    getJogo = async (req, res, next) => {
        try {
            const jogoId = req.params.jogoId;
            const jogo = await Jogo.findByPk(jogoId, {
                include: [
                    { model: Desafio }
                ],
            })
            if (!jogo) {
                return res.status(404).json({ message: 'Jogo not found!' });
            }
            res.status(200).json({ content: jogo });
        } catch (error) {
            console.log(error)
            next(error);
        }

    }

    createJogo = async (req, res, next) => {
        try {
            const { nome, dinamicaId } = req.body;

            const result = await Jogo.create({
                nome: nome,
                ativo: true,
                dinamicaId: dinamicaId
            })
            res.status(201).json({
                message: 'Jogo created successfully!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    updateJogo = async (req, res, next) => {
        try {
            const jogoId = req.params.jogoId;
            const payload = req.body;

            const jogo = await Jogo.findByPk(jogoId)
            if (!jogo) {
                return res.status(404).json({ message: 'Jogo not found!' });
            }
            for (const key of Object.keys(payload)) {
                if (jogo[key])
                    jogo[key] = payload[key]
            }

            const result = await jogo.save();
            res.status(200).json({
                message: 'Jogo updated!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    deleteJogo = async (req, res, next) => {
        try {
            const jogoId = req.params.jogoId;

            const jogo = await Jogo.findByPk(jogoId)
            if (!jogo) {
                return res.status(404).json({ message: 'Jogo not found!' });
            }

            const result = await Jogo.destroy({
                where: {
                    id: jogoId
                }
            });

            res.status(200).json({
                message: 'Jogo deleted!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

module.exports = new JogosController()