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

module.exports = router;