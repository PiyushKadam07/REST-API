const express = require('express');
const Details = require('../app/model/model');
const log = require('../logs/logger');
const Auth = require('../app/model/authentication');

class Registration {
    
    constructor() {
    }

    // create new & validate user
    async registeruser (req, res) {
        const { firstName, lastName, email, password } = req.body;
        // console.log('validateuser', firstName, lastName, email, password);
        if ( !firstName ) {
            log.error('First name cannot be blank')
            return res.status(400).json({ message: "Firstname required" });
        }
        else if ( !lastName ) {
            log.error('Last name cannot be blank')
            return res.status(400).json({ message: "lastname required" });
        }
        else if ( !email ) {
            log.error('Email cannot be blank')
            return res.status(400).json({ message: "Email required" });
        }
        else if ( !password ) {
            log.error('Password cannot be blank')
            return res.status(400).json({ message: "Password required" });
        }
        else if ( !/^([a-zA-Z]+)$/.test(firstName) ) {
            let err = "Only alphabets allowed"
            log.error(err)
            return res.status(400).json({ message: err });
        }
        else if ( !/^([a-zA-Z]+)$/.test(lastName) ) {
            let err = "Only alphabets allowed"
            log.error(err)
            return res.status(400).json({ message: err });
        }
        else if ( !/^([a-zA-Z0-9]+)[@]([a-zA-Z0-9]+)([.][a-zA-Z]{2,})$/.test(email) ) {
            let err = "Invalid email"
            log.error(err)
            return res.status(400).json({ message: err });
        }
        else if ( !/([\w]{3,10})$/.test(password) ) {
            let err = "Invalid password"
            log.error(err)
            return res.status(400).json({ message: err });
        }
        else {
            Details.findOne({ email })
            .then((data) => {
                if ( data ) {
                    let err = "User already registered"
                    log.error(err)
                    res.status(400).json({ message: err });
                }
                else {
                    const user = new Details(req.body);
                    user.save().then((data) => {
                        log.info('New user registered')
                        return res.json(data);
                    })
                    .catch((err) => 
                    {
                        log.error(err)
                        return res.status(400).send(err);
                    });
                }
            })
            .catch((err) => { 
                log.error(err)
                res.status(500).json({ message: err.message })
            });
        }
    }

    // show all users
    async displayusers(req, res) {
        await Details.find().then((data) => {
            res.send(data);
            log.info('All users displayed');
        }).catch((err) => {
            log.error(err)
            res.status(500).json({ message: err.message })
        })
    }
    
    //show any specific user
    async specificuser (req, res) {
        try {
            let detail = await Details.findById(req.params.id)
            res.send(detail)
            log.info('User details displayed');
        } catch (err) {
            log.error(err)
            res.status(500).json({ message: err.message })
        }
    }

    // delete user details
    async deleteuser (req, res) {
        try {
            let detail = await Details.findById(req.params.id)
            await detail.remove()
            res.json({ message: 'Details deleted' })
            log.info('User details deleted');
        } catch (err) {
            log.error(err)
            res.status(500).json({ message: err.message })
        }
    }

    // update user details
    async updateuser (req, res) {
        let detail = await Details.findById(req.params.id)
        if ( req.body.firstName != null ) {
            detail.firstName = req.body.firstName  
        }
        if ( req.body.lastName != null ) {
            detail.lastName = req.body.lastName  
        }
        if ( req.body.email != null ) {
            detail.email = req.body.email  
        }
        if ( req.body.password != null ) {
            detail.password = req.body.password  
        }
        try {
            const updateduser = await detail.save();
            res.status(201).json(updateduser);
            log.info('User details updated');
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }

    // user login
    async loginuser (req, res) {
        const { email, password } = req.body;
        let detail = await Details.findOne({ email, password });
        // console.log(detail);
        if ( detail != null ) {
            log.info(`${detail.firstName} logged in`);
            res.send(detail);
        }
        else {
            let err = "Invalid user. Access not allowed";
            log.error(err);
            return res.status(400).json({ message: err });
        }
    }

}

module.exports = new Registration();