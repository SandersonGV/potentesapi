const controller = require('../controllers/gruposController');
const router = require('express').Router();

// CRUD Routes /grupos
router.get('/', controller.getGrupos); // /grupos
router.get('/:grupoId', controller.getGrupo); // /grupos/:grupoId
router.post('/', controller.createGrupo); // /grupos
router.put('/:grupoId', controller.updateGrupo); // /grupos/:grupoId
router.delete('/:grupoId', controller.deleteGrupo); // /grupos/:grupoId

module.exports = router;