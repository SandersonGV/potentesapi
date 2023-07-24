const controller = require('../controllers/respostasController');
const router = require('express').Router();

// CRUD Routes /respostas
router.get('/', controller.getRespostas); // /respostas
router.get('/:respostaId', controller.getResposta); // /respostas/:respostaId
router.post('/', controller.createResposta); // /respostas
router.put('/:respostaId', controller.updateResposta); // /respostas/:respostaId
router.delete('/:respostaId', controller.deleteResposta); // /respostas/:respostaId

module.exports = router;