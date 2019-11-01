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
  contartickets2,
  miTicket,
  turno,
  salida
} = require('../controlers/cliente.controller')

router.post('/', insertCliente)

// FROM HERE DOWN IS USELESS
router.get('/', getAll)
router.get('/count', contartickets2)
router.put('/:ticket/proceso', updateClienteProceso)
router.put('/:ticket/atendido', updateClienteAtendido)
router.put('/:ticket/email', updateClienteEmail)
router.get('/:ticket/numero', miTicket)
router.get('/:ticket/cola', turno)
router.get('/:ticket/proceso', salida)

module.exports = router
