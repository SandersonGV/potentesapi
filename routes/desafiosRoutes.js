const controller = require('../controllers/desafiosController');
const router = require('express').Router();

// CRUD Routes /desafios
router.get('/', controller.getDesafios); // /desafios
router.get('/:desafioId', controller.getDesafio); // /desafios/:desafioId
router.post('/', controller.createDesafio); // /desafios
router.put('/:desafioId', controller.updateDesafio); // /desafios/:desafioId
router.delete('/:desafioId', controller.deleteDesafio); // /desafios/:desafioId

module.exports = router;