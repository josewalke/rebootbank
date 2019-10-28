const mongoose = require('mongoose')

const cajaSchema = new mongoose.Schema({
    caja: {
        type: Number,
    },
    cliente_id: {
        type: String,
    },
    user_id: {
        type: String,
    }
})

const cajaModel = mongoose.model('caja', cajaSchema)

module.exports = cajaModel
