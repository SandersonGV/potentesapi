const controller = require('../controllers/clientesController');
const router = require('express').Router();

// CRUD Routes /clientes
router.get('/', controller.getClientes); // /clientes
router.get('/:clienteId', controller.getCliente); // /clientes/:clienteId
router.post('/', controller.createCliente); // /clientes
router.put('/:clienteId', controller.updateCliente); // /clientes/:clienteId
router.delete('/:clienteId', controller.deleteCliente); // /clientes/:clienteId

module.exports = router;