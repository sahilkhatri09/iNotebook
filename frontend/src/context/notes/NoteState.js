import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:4000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async () => {
        // API Call 
        const url = `${host}/api/v1/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "jwt-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setNotes(json.notes)
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // TODO: API Call
        // API Call 
        const response = await fetch(`${host}/api/v1/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "jwt-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();
        const note = json.note;
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // TODO: API Call
        await fetch(`${host}/api/v1/notes/deletenote/${id}`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json',
                "jwt-token": localStorage.getItem('token')
            },
        });

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        // console.log(id);
        await fetch(`${host}/api/v1/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "jwt-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;