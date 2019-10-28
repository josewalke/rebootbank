const router = require('express').Router();

const authRouter = require('./auth.router');
const usersRouter = require('./users.router');
const clienteRouter = require('./cliente.router');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/cliente', clienteRouter);


module.exports = router
