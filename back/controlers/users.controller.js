const UserModel = require('../models/users.model')
const clienteModel = require('../models/cliente.model')

module.exports = {
  nextCliente,
  getUserById,
  deleteUserById,
  updateUser,
  primerCliente,
  beforeCliente
}

function primerCliente(req, res) {
  clienteModel
    .findOne({
      status: "proceso"
    })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function nextCliente(req, res) {
  clienteModel.findOneAndUpdate({
      status: "proceso"
    }, {
      status: "atendido"
    })
    .then(update => {
      clienteModel.findOneAndUpdate({
          status: "espera"
        }, {
          status: "proceso"
        })
        .then(response => {
          return res.json(response)
        })
    })
    .catch((err) => handdleError(err, res))
}

function beforeCliente(req, res) {
  clienteModel.findOneAndUpdate({
      status: "proceso"
    }, {
      status: "espera"
    })
    .then(update => {
      console.log(update)
      clienteModel.findOneAndUpdate({
          ticket: update.ticket-1,
          status: "atendido"
        }, {
          status: "proceso"
        })
        .then(response => {
          return res.json(response)
        })
    })
    .catch((err) => handdleError(err, res))
}

function getUserById(req, res) {
  UserModel
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function deleteUserById(req, res) {
  UserModel
    .remove({
      _id: req.params.id
    })
    .then(response => res.json(response))
    .catch(err => handdleError(err, res))
}

function updateUser(req, res) {
  UserModel
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function handdleError(err, res) {
  return res.status(400).json(err)
}