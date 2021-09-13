const jwt = require('jsonwebtoken');
const config = require('../config/config');
const log = require('../logs/logger');

class Token {

    constructor() {
    }

    // jwt create token
    createToken( req, res, next ) {
        const token = jwt.sign ({
            email: req.body.email, password: req.body.password
            }, config.TOKEN_KEY, 
            { expiresIn: '2h' }
        );
            console.log('Token => ',token);
            log.info('TOken created');
            next();
    }

    // verify token
    authenticateToken(req, res, next) {
        console.log('Inside authenticate token');
        const authHeader = req.headers['authorization'];
        const authToken = authHeader && authHeader.split(' ')[1]
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
                // console.log(req.user);
                next();
            }
        });
        }
    }

}

module.exports = new Token();