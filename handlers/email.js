// Importar nodemailer
const nodemailer = require('nodemailer');
// Importar pug
const pug = require('pug');
// Importar juice
const juice = require('juice');
// Importar html-to-text
const htmlToText = require('html-to-text');
// Importar la configuración de Mailtrap.io
const mailTrapConfig = require('../config/email');

//Realizar el envío del correo electrónico
// https://nodemailer.com/about/
async function main(){
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: mailTrapConfig.host,
        port: mailTrapConfig.port,
        secure: false, // true for 465, false for other ports
        auth: {
        user: mailTrapConfig.user, // generated ethereal user
        pass: mailTrapConfig.pass // generated ethereal password
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"UpTask <no-reply@uptask.com>', // sender address
        to: "email@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    });
}
main().catch(console.error);