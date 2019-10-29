const router = require('express').Router()
const {
  autAdmin
} = require('../middleware/authentication')

const {
  nextCliente,
  getUserById,
  deleteUserById,
  updateUser,
  primerCliente,
  beforeCliente
} = require('../controlers/users.controller')

router.get('/', primerCliente)
router.get('/next', nextCliente)
router.get('/before', beforeCliente)
router.get('/:id', getUserById)
router.delete('/:id',autAdmin, deleteUserById)
router.put('/:id', updateUser)

module.exports = router
