const express = require('express');
const log = require('../logs/logger');
const Notes = require('../app/model/notes');
const token = require('../utils/authorization');
const { userid } = require('../utils/authorization');

class notes {

    constructor() {

    }

    // create new note
    async newnote(req, res) {
        const { title, description, color } = req.body;
        // console.log('validateuser', firstName, lastName, email, password);
        if ( !title ) {
            log.error('Title cannot be blank')
            return res.status(400).json({ message: "Title required" });
        }
        else if ( !description ) {
            log.error('Desciption cannot be blank')
            return res.status(400).json({ message: "description required" });
        }
        else if ( !color ) {
            log.error('Enter color')
            return res.status(400).json({ message: "color required" });
        }
        else {
            let userid = token.userid(req);
            // console.log(userid);
            const note = new Notes({ title, description, color, userid });
            note.save().then((data) => {
                log.info('New note created')
                return res.json(data);
            })
            .catch((err) => 
                {
                    log.error(err)
                    return res.status(400).send(err);
                });
        }
    }

    //get all notes
    async allnotes(req, res) {
        // let userid = token.userid();
        // console.log('req');
        await Notes.find().then((data) => {
            res.send(data);
            log.info('All notes displayed');
        }).catch((err) => {
            log.error(err)
            res.status(500).json({ message: err.message })
        })
    }

    //show any specific note
    async specificnote (req, res) {
        try {
            let note = await Notes.findById(req.params.id)
            res.send(note)
            log.info('Note displayed');
        } catch (err) {
            log.error(err)
            res.status(500).json({ message: err.message })
        }
    }

     // update note
     async updatenote (req, res) {
        let note = await Notes.findById(req.params.id)
        if ( req.body.title != null ) {
            note.title = req.body.title  
        }
        if ( req.body.description != null ) {
            note.description = req.body.description  
        }
        if ( req.body.color != null ) {
            note.color = req.body.color  
        }
        try {
            const updatednote = await note.save();
            res.status(201).json({ message: 'Note updated' });
            log.info('Note updated');
        } catch (err) {
            log.error(err)
            return res.status(400).json({ message: err.message })
        }
    }

    // delete note
    async deletenote (req, res) {
        let note = await Notes.findById(req.params.id)
        if ( note.isDeleted == false ) {
            note.isDeleted = true
            try {
                const updatednote = await note.save();
                res.status(201).json(updatednote);
                log.info('Note deleted');
            } catch (err) {
                log.error(err)
                return res.status(400).json({ message: err.message })
            }
        }
    }

    //get deleted notes
    async getdeletednotes (req, res) {
        console.log('Inside getdelete note')
        const user_id = await token.userid(req);
        // console.log(user_id);
        let note = await Notes.find( {"userid" : user_id, "isDeleted": true} );
        console.log(note);
        res.json(note);
    }

    // archive note
    async archivenote (req, res) {
        let note = await Notes.findById(req.params.id)
        if ( note.isArchived == false ) {
            note.isArchived = true;
            try {
                const updatednote = await note.save();
                res.status(201).json(updatednote);
                log.info('Note archived');
            } catch (err) {
                log.error(err)
                return res.status(400).json({ message: err.message })
            }
        }
    }

    //get archive notes
    async getarchivednotes (req, res) {
        console.log('Inside archive note')
        const user_id = await token.userid(req);
        console.log(user_id,typeof(user_id));
        let note = await Notes.find({ "userid" : user_id, "isArchived": true });
        console.log(note);
        res.json(note);
    }

    //delete note from database
    async deletenotedb( req, res ) {
        try {
            let note = await Notes.findById(req.params.id)
            await note.remove()
            res.json({ message: 'Note deleted' })
            log.info('Note deleted');
        } catch (err) {
            log.error(err)
            res.status(500).json({ message: err.message })
        }
    }

}

module.exports = new notes();