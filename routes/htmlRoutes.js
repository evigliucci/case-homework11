// Include Dependencies 
var path = require("path");
var router = require("express").Router();

// Create route for /notes from public directory 
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
})

// Create the default route. Redirect every other route request to index.html
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

//Export Routes
module.exports = router;