const jwt = require('jsonwebtoken');
const Details = require('../app/model/model');
const config = require('../config/config');
const log = require('../logs/logger');

class Token {

    constructor() {
    }

    // jwt create token
    async createToken( req, res, next ) {
        const { email, password } = req.body;
        let detail = await Details.findOne({ email, password });
        // console.log(detail, detail._id, email, password);
        // , email: email, password: password
        const token = jwt.sign ({
            user_id: detail._id
            }, config.TOKEN_KEY
        );
        console.log('Token => ',token);
        log.info('Token created');
        next();
    }

    // verify token
    authenticateToken( req, res, next) {
        console.log('Inside authenticate token');
        const authHeader = req.headers['authorization'];
        const authToken = authHeader && authHeader.split(' ')[1];
        // console.log(authHeader, authToken );
        if ( authToken == null ) {
            log.error('No token found')
            return res.status(401).send("No token found")
        }
        else {
            jwt.verify( authToken, config.TOKEN_KEY, (err, user) => {
            if (err) {
                console.log('Invalid token');
                log.error('Invalid token')
                // console.log(err);
                return res.status(403).send("Invalid Token");
            }
            else {
                console.log('Token authenticated');
                log.info('Token authenticated');
                req.user = user;
                next();
            }
        });
        }
    }

    //return user id
    userid(req) {
        const authHeader = req.headers['authorization'];
        const authToken = authHeader && authHeader.split(' ')[1];
        jwt.verify( authToken, config.TOKEN_KEY, (err, user) => {
            req.user = user;
        });
        return req.user.user_id;
        // next(req.user.user_id);
    }

    //return user id
    user(req, token) {
        jwt.verify( token, config.TOKEN_KEY, (err, user) => {
            req.user = user;
        });
        return req.user.user_id;
    }


}

module.exports = new Token();