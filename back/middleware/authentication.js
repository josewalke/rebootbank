const UserModel = require('../models/users.model')
const jwt = require('jsonwebtoken')

const autEmpleado = (req, res, next) => {
    jwt.verify(req.headers.token, 'secret', (err, token) => {
        if (err) {
            res.status(403).json({
                error: 'Token not valid'
            })
        }
        UserModel.findOne({
                email: token.email,
                rol: "Empleado"
                //rol: "admin"
            })
            .then(user => {
                if(user){
                    res.locals.user = user
                    next()
                }else{
                    res.status(403).json({
                        error: 'Prohibido el acceso'
                    })
                }
            })
    });
}

const autAdmin = (req, res, next) => {
    //console.log(req.headers)
    jwt.verify(req.headers.token, 'secret', (err, token) => {
        if (err) {
            return res.status(403).json({
                error: 'Token not valid'
            })
        }
        UserModel.findOne({
                email: token.email,
                rol: "Admin"
            })
            .then(user => {
                if(user){
                    res.locals.user = user
                    next()
                }else{
                    res.status(403).json({
                        error: 'Token not valid'
                    })
                }
                
            })
    });
}

module.exports = { autEmpleado, autAdmin}