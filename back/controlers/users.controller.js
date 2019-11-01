const UserModel = require('../models/users.model')
const clienteModel = require('../models/cliente.model')
const nodemailer = require('nodemailer')

module.exports = {
  nextCliente,
  getUserById,
  deleteUserById,
  updateUser,
  primerCliente,
  beforeCliente
}
let config = require('../.env')
const environment = process.env.NODE_ENV
config = config[environment]

function primerCliente (req, res) {
  clienteModel
    .findOne({
      status: 'proceso'
    })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function nextCliente (req, res) {
  clienteModel
    .findOneAndUpdate({ status: 'proceso' }, { status: 'atendido' })
    .then(update => {
      clienteModel
        .findOneAndUpdate({ status: 'espera' }, { status: 'proceso' })
        .then(response => {
          // return res.json(response)
          clienteModel
            .findOne({ status: 'proceso' })
            .then(buscar => {
              var encontrar = buscar.ticket + 2
              // console.log(encontrar);
              clienteModel.findOne({
                ticket: encontrar
              })
                .then(encontrado => {
                  var email = encontrado.email
                  // console.log(email);
                  var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: config.nodemailer.email,
                      pass: config.nodemailer.password
                    }
                  })
                  const mailOptions = {
                    from: 'worktrabajo47@gmail.com', // sender address
                    to: email, // list of receivers
                    subject: 'Rebootbank', // Subject line
                    html: '<p>Hay dos personas por delante</p>' // plain text body
                  }
                  transporter.sendMail(mailOptions, function (err, info) {
                    if (err) { console.log(err) } else { console.log(info) }

                    res.json(response)
                  })
                  return console.log(email)
                })
              res.json(response)
            })
        })
    })
    .catch((err) => handdleError(err, res))
}

function beforeCliente (req, res) {
  clienteModel.findOneAndUpdate({
    status: 'proceso'
  }, {
    status: 'espera'
  })
    .then(update => {
      console.log(update)
      clienteModel.findOneAndUpdate({
        ticket: update.ticket - 1,
        status: 'atendido'
      }, {
        status: 'proceso'
      })
        .then(response => {
          return res.json(response)
        })
    })
    .catch((err) => handdleError(err, res))
}

function getUserById (req, res) {
  UserModel
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function deleteUserById (req, res) {
  UserModel
    .remove({
      _id: req.params.id
    })
    .then(response => res.json(response))
    .catch(err => handdleError(err, res))
}

function updateUser (req, res) {
  UserModel
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function handdleError (err, res) {
  return res.status(400).json(err)
}
