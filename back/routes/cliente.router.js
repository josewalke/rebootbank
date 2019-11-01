const router = require('express').Router()

// const {
//   autEmpleado,
//   autAdmin
// } = require('../middleware/authentication')

const {
  insertCliente,
  updateClienteProceso,
  updateClienteAtendido,
  updateClienteEmail,
  getAll,
  contartickets,
  miTicket,
  turno,
  salida
} = require('../controlers/cliente.controller')

router.get('/', getAll)
router.get('/count', contartickets)
router.post('/:ticket', insertCliente)
router.put('/:ticket/proceso', updateClienteProceso)
router.put('/:ticket/atendido', updateClienteAtendido)
router.put('/:ticket/email', updateClienteEmail)
router.get('/:ticket/numero', miTicket)
router.get('/:ticket/cola', turno)
router.get('/:ticket/proceso', salida)


module.exports = router
