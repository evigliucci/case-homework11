// Include Dependencies 
const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const uuid = require('uuid/v4');

//READ NOTES
// api/notes, Read notes for DB, check for errors, convert json and return the result. 
router.get('/notes', (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
})

// ADD NEW NOTE
// api/notes, Get exisitng notes, add new note to exisiting list of notes, add all updated notes to the DB. 
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

// DELETE NOTE
// Get notes, check for errors, Filter out note based on ID from DB, send updated list to DB. 
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

// Export Routes
module.exports = router;