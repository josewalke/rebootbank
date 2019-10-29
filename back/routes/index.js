const router = require('express').Router();

const authRouter = require('./auth.router');
const usersRouter = require('./users.router');
const clienteRouter = require('./cliente.router');
const correoRouter = require('./correo.router');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/cliente', clienteRouter);
router.use('/correo',correoRouter);


module.exports = router
