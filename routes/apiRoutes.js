var path = require("path");
var fs = require("fs");
var router = require("express").Router();
var store = require("../db/store");
var notesData = require("../db/db");
const uuid = require('uuid/v4');

//api/notes
router.get('/notes', (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
})

//api/notes
router.post("/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuid()
        }
        notes.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
    });
});

// Delete a note
router.delete("/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== req.params.id);

        fs.writeFile("./db/db.json", JSON.stringify(updatedNotes), (err) => {
            if (err) throw err;
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
    });
});

module.exports = router;