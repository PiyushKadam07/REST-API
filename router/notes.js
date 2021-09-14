const express = require('express');
const router = express.Router();
const notes = require('../Controller/notes')
const token = require('../utils/authorization');

console.log("Inside notes router");

// create new note
router.post("/", token.authenticateToken, notes.newnote);

// get all notes
router.get("/allnotes", token.authenticateToken, notes.allnotes);

// get specific note
router.get("/note/:id", token.authenticateToken, notes.specificnote);

// update note 
router.patch('/update/:id', token.authenticateToken, notes.updatenote);

//delete note
router.patch('/delete/:id', token.authenticateToken, notes.deletenote);

// get all deleted notes
router.get("/alldeletednotes", token.authenticateToken, notes.getdeletednotes);

//archive note
router.get('/archive/:id', token.authenticateToken, notes.archivenote);

//get all archive note
router.get('/allarchivednotes', token.authenticateToken, notes.getarchivednotes);

// *** delete notes
router.delete("/deletenote/:id", token.authenticateToken, notes.deletenotedb);

module.exports = router;