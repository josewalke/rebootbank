const router = require('express').Router()
const {
  autAdmin
} = require('../middleware/authentication')

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser
} = require('../controlers/users.controller')

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.delete('/:id',autAdmin, deleteUserById)
router.put('/:id', updateUser)

module.exports = router
