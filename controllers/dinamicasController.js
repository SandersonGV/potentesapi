const { Dinamica, Jogo } = require('../models/models');

// CRUD Controllers
class DinamicasController {
    getDinamicas = async (req, res, next) => {
        try {
            const query = req.query;
            query.ativo = true

            const dinamicas = await Dinamica.findAll({
                include: [
                    { model: Jogo }
                ],
                where: query,
                order: [['id', 'ASC']]
            })
            res.status(200).json({ content: dinamicas });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    getDinamica = async (req, res, next) => {
        try {
            const dinamicaId = req.params.dinamicaId;
            const dinamica = await Dinamica.findByPk(dinamicaId, {
                include: [
                    { model: Jogo }
                ]
            })
            if (!dinamica) {
                return res.status(404).json({ message: 'Dinamica not found!' });
            }
            res.status(200).json({ content: dinamica });
        } catch (error) {
            console.log(error)
            next(error);
        }

    }

    createDinamica = async (req, res, next) => {
        try {
            const { nome } = req.body;

            const result = await Dinamica.create({
                nome: nome,
                ativo: true
            })
            res.status(201).json({
                message: 'Dinamica created successfully!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    updateDinamica = async (req, res, next) => {
        try {
            const dinamicaId = req.params.dinamicaId;
            const payload = req.body;

            const dinamica = await Dinamica.findByPk(dinamicaId)
            if (!dinamica) {
                return res.status(404).json({ message: 'Dinamica not found!' });
            }
            for (const key of Object.keys(payload)) {
                if (dinamica[key])
                    dinamica[key] = payload[key]
            }

            const result = await dinamica.save();
            res.status(200).json({
                message: 'Dinamica updated!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    deleteDinamica = async (req, res, next) => {
        try {
            const dinamicaId = req.params.dinamicaId;

            const dinamica = await Dinamica.findByPk(dinamicaId)
            if (!dinamica) {
                return res.status(404).json({ message: 'Dinamica not found!' });
            }

            const result = await Dinamica.destroy({
                where: {
                    id: dinamicaId
                }
            });

            res.status(200).json({
                message: 'Dinamica deleted!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

module.exports = new DinamicasController()