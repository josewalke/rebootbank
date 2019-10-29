const UserModel = require('../models/users.model')
const clienteModel = require('../models/cliente.model')
const nodemailer = require('nodemailer');
module.exports = {
    enviarCorreo
}
function enviarCorreo(req,res){
    let email = req.params.email;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'worktrabajo47@gmail.com',
            pass: 'qedzes-tuxca0-wirqaX'
        }
    });
    const mailOptions = {
        from: 'worktrabajo47@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Subject of your email', // Subject line
        html: '<p>Your html here</p>' // plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
    return console.log(email);
}

