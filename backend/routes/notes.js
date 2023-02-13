const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser')
const Notes = require('../models/Note');
// Get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id });
        return res.status(200).json({
            success: true,
            notes
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Internal server error"
        })
    }
})

router.post('/addnote', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        if (!title || title.length < 3 || !description) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid note"
            })
        }
        const note = await Notes.create({
            title,
            description, tag,
            user: req.user.id,
        })

        return res.status(200).json({
            success: true,
            note
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Internal server error"
        })
    }
})



//update an exisiting note note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a newNote object
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Not found"
            })
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Not Allowed"
            })
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        return res.json({ note });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Internal server error"
        })
    }
})


// Delete note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {


        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Not found"
            })
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Not Allowed"
            })
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Note has been deleted"
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Internal server error"
        })
    }
})


module.exports = router;