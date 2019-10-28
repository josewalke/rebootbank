const mongoose = require('mongoose')

const clienteSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    ticket: {
        type: Number,
    },
    email: {
        type: String,
        validate: {
            validator(value) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
            }
        }
    },
    atendido: {
        type: Boolean,
    },
    espera: {
        type: Boolean,
    }
})

const clienteModel = mongoose.model('cliente', clienteSchema)

module.exports = clienteModel
