const nodemailer = require("nodemailer");
const config = require('../config/config');
module.exports = {

    sendMail(to, url) {
        // console.log(config.email, config.password);

        console.log(" Email to ", to);

        var transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: config.email,
                pass: config.password
            }
        });
        var mailOptions = {
            from: config.email, // sender address
            to: to, // list of receivers
            subject: "Reset Your Password ", // Subject line
            text: "", // plaintext body
            html: "<h4>We received a request to reset the password.</h4></br>\
               <p>Click below link to reset your password.</p>  </br>\
               \n \n  "+ url 
        }

        transport.sendMail(mailOptions, function (error) {
            if (error) {
                console.log("Message not sent ", error);
                // console.log(error);
            } else {
                console.log("Message sent to: " + to);

            }
            transport.close(); // shut down the connection pool, no more messages
        });
    }
}