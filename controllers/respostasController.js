const { Resposta } = require('../models/models');

// CRUD Controllers
class RespostasController {
    getRespostas = async (req, res, next) => {
        try {
            const query = req.query;
            query.ativo=true

            const respostas = await Resposta.findAll({
                where: query,
                order: [['id', 'ASC']]
            })
            res.status(200).json({ content: respostas });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    getResposta = async (req, res, next) => {
        try {
            const respostaId = req.params.respostaId;
            const resposta = await Resposta.findByPk(respostaId)
            if (!resposta) {
                return res.status(404).json({ message: 'Resposta not found!' });
            }
            res.status(200).json({ content: resposta });
        } catch (error) {
            console.log(error)
            next(error);
        }

    }

    createResposta = async (req, res, next) => {
        try {
            const payload = req.body;
            const result = await Resposta.bulkCreate(payload)
            res.status(201).json({
                message: 'Resposta created successfully!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    updateResposta = async (req, res, next) => {
        try {
            const respostaId = req.params.respostaId;
            const payload = req.body;

            const resposta = await Resposta.findByPk(respostaId)
            if (!resposta) {
                return res.status(404).json({ message: 'Resposta not found!' });
            }
            for (const key of Object.keys(payload)) {
                if (resposta[key])
                    resposta[key] = payload[key]
            }

            const result = await resposta.save();
            res.status(200).json({
                message: 'Resposta updated!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    deleteResposta = async (req, res, next) => {
        try {
            const respostaId = req.params.respostaId;

            const resposta = await Resposta.findByPk(respostaId)
            if (!resposta) {
                return res.status(404).json({ message: 'Resposta not found!' });
            }

            const result = await Resposta.destroy({
                where: {
                    id: respostaId
                }
            });

            res.status(200).json({
                message: 'Resposta deleted!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

module.exports = new RespostasController()