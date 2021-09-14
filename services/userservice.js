const Details = require('../app/model/model');
const log = require('../logs/logger');
const config = require('../config/config');
const Auth = require('../app/model/authentication');
const jwt = require('jsonwebtoken');
const mailer = require('./nodemailer');

class Service {
    constructor() {

    }

    forgetpasswd (data) {
        var token = jwt.sign ({ user_id : data._id },  config.TOKEN_KEY);
        console.log(token);
        
        //call sendMail function
        var url = "http://localhost:3000/reset/" + token;
        mailer.sendMail(data.email, url);

    }
}

module.exports = new Service();