const controller = require('../controllers/participantesController');
const router = require('express').Router();

// CRUD Routes /participantes
router.get('/', controller.getParticipantes); // /participantes
router.get('/:participanteId', controller.getParticipante); // /participantes/:participanteId
router.post('/', controller.createParticipante); // /participantes
router.put('/:participanteId', controller.updateParticipante); // /participantes/:participanteId
router.delete('/:participanteId', controller.deleteParticipante); // /participantes/:participanteId

module.exports = router;