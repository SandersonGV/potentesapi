const controller = require('../controllers/dinamicasController');
const router = require('express').Router();

// CRUD Routes /dinamicas
router.get('/', controller.getDinamicas); // /dinamicas
router.get('/:dinamicaId', controller.getDinamica); // /dinamicas/:dinamicaId
router.post('/', controller.createDinamica); // /dinamicas
router.put('/:dinamicaId', controller.updateDinamica); // /dinamicas/:dinamicaId
router.delete('/:dinamicaId', controller.deleteDinamica); // /dinamicas/:dinamicaId

module.exports = router;