const clienteModel = require('../models/cliente.model')
const nodemailer = require('nodemailer')
module.exports = {
  enviarCorreo,
  enviarCorreoInsert
}
let config = require('../.env')
const environment = process.env.NODE_ENV
config = config[environment]

function enviarCorreoInsert (req, res) {
  return clienteModel.find().count()
    .then(response => {
      var conteo = response + 1

      // insert in database
      const clienteBody = {
        ticket: conteo,
        email: req.params.email
      }
      clienteModel.create(clienteBody)
        .then(newObj => {
          console.log(config.nodemailer.email)
          console.log(config.nodemailer.password)
          const email = req.params.email
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
            html: `<p>Su ticket es el numero ${conteo}</p>
                                <button> <a href="http://localhost:8080/cola2.html?ticket=${conteo}"> PULSAME </a> </button>
                                ` // plain text body
          }
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) { console.log(err) } else { console.log(info) }
            res.json(response + 1)
          })
          return console.log(email)
          // enviar correo
        })
    })
    .catch((err) => handdleError(err, res))
}

function enviarCorreo (req, res) {
  const email = req.params.email
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
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>' // plain text body
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) { console.log(err) } else { console.log(info) }
  })
  return console.log(email)
}

function handdleError (err, res) {
  return res.status(400).json(err)
}
