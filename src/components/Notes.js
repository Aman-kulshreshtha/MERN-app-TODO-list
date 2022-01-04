import React from "react";
import { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
export default function Notes(props) {
  
  const { notes, setNotes, fetchAllNotes } = useContext(noteContext);
  useEffect(() => {
    fetchAllNotes();
  }, []);
  return (
    <div className="flex justify-center">
      <div className="row w-2/3">
        <h2 className=" text-2xl my-4">Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </div>
  );
}
