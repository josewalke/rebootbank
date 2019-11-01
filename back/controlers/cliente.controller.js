const clienteModel = require('../models/cliente.model')

module.exports = {
  insertCliente,
  updateClienteProceso,
  updateClienteAtendido,
  updateClienteEmail,
  getAll,
  contartickets,
  miTicket,
  turno,
  salida
}

function insertCliente (req, res) {
  const count = contartickets(req, res)
  clienteModel
    .create({ ticket: count, email: req.body.email })
    .then(cliente => res.json(cliente))
    .catch((err) => handleError(err, res))
}

// function insertCliente (req, res) {
//   // let newticket = contartickets
//   const clienteBody = {
//     // ticket: newticket
//     ticket: +req.params.ticket

//   }
//   clienteModel.findOne(clientBody)
//     .then(client => {
//       if (client) { return res.json(client) }
//       else {
//         return clienteModel.create(clienteBody)
//           .then(response => res.json(response))
//           .catch((err) => handleError(err, res))
//       }
//     })
// }

function contartickets (req, res) {
  clienteModel.find().count()
    .then(response => {
      return res.json(response + 1)
    })
    .catch((err) => handleError(err, res))
}

function updateClienteProceso (req, res) {
  clienteModel.findOneAndUpdate({
    ticket: req.params.ticket
  }, {
    status: 'proceso'
  })
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function updateClienteAtendido (req, res) {
  clienteModel.findOneAndUpdate({
    ticket: req.params.ticket
  }, {
    status: 'atendido'
  })
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function updateClienteEmail (req, res) {
  clienteModel.findOneAndUpdate({
    ticket: req.params.ticket
  }, {
    email: req.body.remitente
  })
    .then(response => res.json('Actualizado'))
    .catch((err) => handleError(err, res))
}

function getAll (req, res) {
  clienteModel.find()
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function miTicket (req, res) {
  clienteModel.findOne({
    ticket: req.params.ticket
  })
    .then(response => res.json(response.ticket))
    .catch((err) => handleError(err, res))
}

function turno (req, res) {
  clienteModel.find({
    ticket: {
      $lt: req.params.ticket
    },
    status: 'espera'
  }).count()
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function salida (req, res) {
  clienteModel.findOne({
    ticket: req.params.ticket,
    status: 'proceso'
  })
    .then(response => res.json(response.status))
    .catch((err) => handleError(err, res))
}

function handleError (err, res) {
  return res.status(400).json(err)
}
