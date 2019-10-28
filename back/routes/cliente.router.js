const router = require('express').Router();

const {
    autEmpleado,
    autAdmin
} = require('../middleware/authentication');

const {
   insertCliente,
   updateClienteProceso,
   updateClienteAtendido,
   updateClienteEmail,
   getAll
} = require('../controlers/cliente.controller');

router.get("/",autEmpleado,getAll);
router.post('/:ticket', insertCliente);
router.put('/:ticket/proceso', autEmpleado, updateClienteProceso);
router.put('/:ticket/atendido', autEmpleado, updateClienteAtendido);
router.put('/:ticket/email', autEmpleado, updateClienteEmail);

module.exports = router
