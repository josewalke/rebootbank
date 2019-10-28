const clienteModel = require('../models/cliente.model')

module.exports = {
    insertCliente,
    updateClienteProceso,
    updateClienteAtendido,
    updateClienteEmail,
    getAll
}

function insertCliente(req, res) {
    //let newticket = contartickets
    const clienteBody = {
        //ticket: newticket
        ticket: +req.params.ticket

    }
    console.log(clienteBody);
   return clienteModel.create(clienteBody)
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}

function contartickets(req,res){
   return clienteModel.find().count()
        .then(response => res.json(response + 1))
        .catch((err) => handdleError(err, res))
}

function updateClienteProceso(req, res) {
    clienteModel.findOneAndUpdate({
            ticket: req.params.ticket
        }, {
            status: "proceso"
        })
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}
function updateClienteAtendido(req, res) {
    clienteModel.findOneAndUpdate({
            ticket: req.params.ticket
        }, {
            status: "atendido"
        })
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}

function updateClienteEmail(req,res){
    clienteModel.findOneAndUpdate({
            ticket: req.params.ticket
        }, {
            email: req.body.email
        })
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}

function getAll(req,res){
    clienteModel.find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}