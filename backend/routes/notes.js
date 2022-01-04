const express = require("express");
const router = express.Router();
const getUser = require("../middlewares/getUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route to fetch all notes GET api/notes/fetch-all login required
router.get("/fetch-all", getUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// Route to add a note POST api/notes/addnote login required
router.post(
  "/addnote",
  getUser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, tag, description } = req.body;
      const note = new Notes({
        title,
        tag,
        description,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error);
      res.status(500).send("Some error occured");
    }
  }
);

// Route to update a note POST api/notes/update-note login required
router.put("/updatenote/:id", getUser, async (req, res) => {
  try {
    const { title, tag, description } = req.body;
    let note = await Notes.findById(req.params.id);

    if (!note) return res.status(404).send("Not found");

    const updatedNote = {};

    if (title) updatedNote.title = title;
    if (description) updatedNote.description = description;
    if (tag) updatedNote.tag = tag;

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: updatedNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error occured");
  }
});

// Route to delete a note DELETE api/notes/deletenote login required
router.delete("/deletenote/:id", getUser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);

    if (!note) return res.status(404).send("Not found");

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ status: "Successfully deleted", id: req.params.id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
