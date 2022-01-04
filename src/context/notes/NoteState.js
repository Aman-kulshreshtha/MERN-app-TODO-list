import NoteContext from "./noteContext";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const NoteState = (props) => {
  // const s = {
  //   name: "Aman",
  //   class: "5b",
  // };

  // const [state, setstate] = useState(s);
  let notesInitial = [];
  let history = useHistory();
  const token = localStorage.getItem("token");
  const prefix = "http://localhost:5000/";

  const [notes, setNotes] = useState([]);

  const clearNotes = () => {
    setNotes([]);
  };

  const fetchAllNotes = async () => {
    setNotes([]);
    if (!token) {
      history.push("/login");
    }
    const response = await fetch(`${prefix}api/notes/fetch-all`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token": token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const newNotes = await response.json();
    setNotes(newNotes); // parses JSON response into native JavaScript objects
  };

  //Adding a note

  const addNote = async (title, description, tag) => {
    if (!token) {
      history.push("/login");
    }
    const response = await fetch(`${prefix}api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const newNote = await response.json();

    setNotes(notes.concat(newNote));
  };

  //editing a note
  const editNote = async (id, title, description, tag) => {
    if (!token) {
      history.push("/login");
    }

    const response = await fetch(`${prefix}api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": token, // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const newNote = await response.json();
    console.log(newNote);
  };

  //deleting a note
  const deleteNote = async (id) => {
    if (!token) {
      history.push("/login");
    }
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);

    const response = await fetch(`${prefix}api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const json = await response.json();
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        clearNotes,
        editNote,
        addNote,
        deleteNote,
        fetchAllNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
