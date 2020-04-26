// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var notesData = require("../db/db");
import { v4 as uuidv4 } from 'uuid';

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // When a user submits form data (a JSON object)
    // Then the server saves the data to the notesData array)
    // ---------------------------------------------------------------------------

    app.post("/api/notes", function(req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware
        uuidv4();
        console.log(uuidv4);
        notesData.push(req.body);
        res.json(true);
    });

    // Delete a note
    app.delete("/api/notes/:id", function(req, res) {
        // Empty out the arrays of data
        //notesData.foreach(checkNoteID)

        //function checkNoteID()
        res.send('Deleted Note [XYZ]')
    });
};