const router = require('express').Router()

const {
    enviarCorreo
} = require('../controlers/correo.controller');

router.post('/:email', enviarCorreo)
module.exports = router