const { Desafio, Opcao, database } = require('../models/models');

// CRUD Controllers
class DesafiosController {
    getDesafios = async (req, res, next) => {
        try {
            const query = req.query;
            query.ativo = true

            const desafios = await Desafio.findAll({
                include: 'opcoes',
                where: query,
                order: [['id', 'ASC']]
            })
            res.status(200).json({ content: desafios });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    getDesafio = async (req, res, next) => {
        try {
            const desafioId = req.params.desafioId;
            const desafio = await Desafio.findByPk(desafioId, {
                include: 'opcoes',
            })
            if (!desafio) {
                return res.status(404).json({ message: 'Desafio not found!' });
            }
            res.status(200).json({ content: desafio });
        } catch (error) {
            console.log(error)
            next(error);
        }

    }

    createDesafio = async (req, res, next) => {
        try {
            const { titulo, descricao, jogoId, opcoes } = req.body;

            const result = await Desafio.create({
                titulo: titulo,
                descricao: descricao,
                ativo: true,
                jogoId: jogoId,
                opcoes: opcoes
            }, {
                include: [
                    { association: Desafio.Opcoes }
                ],
            })
            res.status(201).json({
                message: 'Desafio created successfully!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    updateDesafio = async (req, res, next) => {
        try {
            const desafioId = req.params.desafioId;
            const payload = req.body;
            const { opcoes: opcoesData, ...dadosDesafio } = payload;

            const desafio = await Desafio.findByPk(desafioId)
            if (!desafio) {
                return res.status(404).json({ message: 'Desafio not found!' });
            }

            await desafio.update(dadosDesafio, { fields: ["descricao", "titulo"] });

            const opcoesAtuais = await desafio.getOpcoes();
            const opcoesParaExcluir = opcoesAtuais.filter(
                (opcaoAtual) => !opcoesData.some((opcaoNova) => opcaoNova.id === opcaoAtual.id)
            );

            for (const opcaoExcluir of opcoesParaExcluir) {
                await opcaoExcluir.destroy();
            }

            for (const opcaoNova of opcoesData) {
                if (opcaoNova.id) {
                    const opcaoAtualizar = opcoesAtuais.find((opcaoAtual) => opcaoAtual.id === opcaoNova.id);
                    if (opcaoAtualizar) {
                        await opcaoAtualizar.update(opcaoNova);
                    }
                } else {
                    await Opcao.create({ ...opcaoNova, desafioId: desafioId });
                }
            }
            const result = await Desafio.findByPk(desafioId, { include: "opcoes" });

            res.status(200).json({
                message: 'Desafio updated!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    deleteDesafio = async (req, res, next) => {
        try {
            const desafioId = req.params.desafioId;

            const desafio = await Desafio.findByPk(desafioId)
            if (!desafio) {
                return res.status(404).json({ message: 'Desafio not found!' });
            }

            const result = await Desafio.destroy({
                where: {
                    id: desafioId
                }
            });

            res.status(200).json({
                message: 'Desafio deleted!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

module.exports = new DesafiosController()