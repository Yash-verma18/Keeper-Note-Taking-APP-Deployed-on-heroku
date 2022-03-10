//jshint esversion :9

const express = require("express");
const router = express.Router();
const Note = require("../models/model");

router.get("/notes", (req, res) => {
  Note.find({}, (err, notes) => {
    if (!notes) {
      console.log("No notes found");
    } else {
      res.json(notes);
    }
  });
});

router.post("/notes", (req, res) => {
  const note = new Note(req.body);
  note.save().then((note) => {
    res.send(note);
  });
});

router.patch("/notes/:id", (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.json("Note updated.");
  });
});

router.delete("/notes/:id", (req, res) => {
  Note.findByIdAndRemove(req.params.id, (err) => {
    if (!err) {
      res.status(200).json("Note deleted");
    } else {
      console.log(err.message);
    }
  });
});

module.exports = router;
