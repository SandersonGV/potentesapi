const controller = require('../controllers/jogosController');
const router = require('express').Router();

// CRUD Routes /jogos
router.get('/', controller.getJogos); // /jogos
router.get('/:jogoId', controller.getJogo); // /jogos/:jogoId
router.post('/', controller.createJogo); // /jogos
router.put('/:jogoId', controller.updateJogo); // /jogos/:jogoId
router.delete('/:jogoId', controller.deleteJogo); // /jogos/:jogoId

module.exports = router;