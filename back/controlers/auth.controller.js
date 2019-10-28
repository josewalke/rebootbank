const UserModel = require('../models/users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  signup,
  login
}

function signup (req, res) {
  const hashedPwd = bcrypt.hashSync(req.body.password, 10)
  const userBody = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPwd,
    rol: req.body.rol
  }

  UserModel
    .create(userBody)
    .then(() => {
      const userData = { username: req.body.name, email: req.body.email }

      const token = jwt.sign(
        userData,
        'secret', // TODO SECRET MORE SECRET PLEASE
        { expiresIn: '1w' }
      )

      return res.json({ token: token, ...userData })
    })
    .catch((err) => {
      res.status(403).json({ error: err })
    })
}

function login (req, res) {
  UserModel
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) { return res.json({ error: 'wrong email' }) }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) { return res.json({ error: `wrong password for ${req.body.email}` }) }

        const userData = { name: user.name, email: user.email, rol: user.rol }

        const token = jwt.sign(
          userData,
          'secret', // TODO SECRET MORE SECRET PLEASE
          { expiresIn: '1h' }
        )

        return res.json({ token: token, ...userData })
      })
    })
    .catch(err => handdleError(err, res))
}

function handdleError (err, res) {
  return res.status(400).json(err)
}
