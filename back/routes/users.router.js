const router = require('express').Router()
const {
  autAdmin,
  autEmpleado
} = require('../middleware/authentication')

const {
  nextCliente,
  getUserById,
  deleteUserById,
  updateUser,
  primerCliente,
  beforeCliente
} = require('../controlers/users.controller')

router.get('/', autEmpleado, primerCliente)
router.get('/next', autEmpleado, nextCliente)
router.get('/before', autEmpleado, beforeCliente)
router.get('/:id', autEmpleado, getUserById)
router.delete('/:id', autAdmin, deleteUserById)
router.put('/:id', autEmpleado, updateUser)

module.exports = router
