var path = require("path");
var router = require("express").Router();

var notesData = require("../db/db");

//api/notes
router.get('/api/notes', function(req, res) {
    //store.read
    res.json(notesData);
})

//api/notes
router.post("/api/notes", function(req, res) {
    notesData.push(req.body);
});

// Delete a note
router.delete("/api/notes/:id", function(req, res) {
    res.send('Deleted Note [XYZ]')
});

module.exports = router;