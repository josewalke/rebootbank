const router = require('express').Router()

const {
  enviarCorreo,
  enviarCorreoInsert
} = require('../controlers/correo.controller');

router.post('/:email', enviarCorreo);
router.post('/:email/insert', enviarCorreoInsert);
module.exports = router