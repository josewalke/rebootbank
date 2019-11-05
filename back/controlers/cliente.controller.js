const clienteModel = require('../models/cliente.model')
const nodeMailer = require('nodemailer')

let config = require('../.env')
const environment = process.env.NODE_ENV
config = config[environment]

module.exports = {
  insertCliente,
  insertCliente2,
  updateClienteProceso,
  updateClienteAtendido,
  updateClienteEmail,
  getAll,
  contartickets,
  contartickets2,
  miTicket,
  turno,
  salida
}

function insertCliente (req, res) {
  contartickets(req, res)
    .then(count => {
      const newcount = count + 1
      clienteModel
        .create({ ticket: newcount, email: req.body.email })
        .then(cliente => {
          var transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
              user: config.nodemailer.email,
              pass: config.nodemailer.password
            }
          })
          const mailOptions = {
            from: 'worktrabajo47@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'Rebootbank', // Subject line
            html: `<p>Su ticket es el numero ${newcount}</p>
                  <button> <a href="http://localhost:8080/cola2.html?ticket=${newcount}"> PULSAME </a> </button>
                  ` // plain text body
          }
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(info)
            }
          })
          // return console.log(email)
          return res.json(cliente)
        })
        .catch((err) => handleError(err, res))
    })
}

function insertCliente2 (req, res) {
  // let newticket = contartickets
  const clienteBody = {
    // ticket: newticket
    ticket: +req.params.ticket

  }
  clienteModel.findOne(clienteBody)
    .then(client => {
      if (client) { return res.json(client) } else {
        return clienteModel.create(clienteBody)
          .then(response => res.json(response))
          .catch((err) => handleError(err, res))
      }
    })
}

function contartickets (req, res) {
  return clienteModel.countDocuments((err, count) => {
    return count
  })
  // .then(response => {
  //   return res.json(response + 1)
  // })
  // .catch((err) => handleError(err, res))
}
function contartickets2 (req, res) {
  return clienteModel.find().count()
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
  console.log(req.body)
  clienteModel.findOneAndUpdate({
    ticket: req.params.ticket
  }, {
    email: req.body.email
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
    .then(response => res.json(response))
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
