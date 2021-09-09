const express = require('express');
const router = express.Router();
const notes = require('../Controller/notes')

console.log("Inside notes router");

// create new note
router.post("/", notes.newnote);

// get all notes
router.get("/allnotes", notes.allnotes);

// get specific note
router.get("/:id", notes.specificnote);

// update note 
router.patch('/update/:id', notes.updatenote);

//delete note
router.patch('/delete/:id', notes.deletenote);

//archive note
router.patch('/archive/:id', notes.archivenote);

module.exports = router;