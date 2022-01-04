import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import modalContext from "../context/Modal/modalContext";

export default function NoteItem(props) {
  const editModal = () => {};
  const { deleteNote } = useContext(noteContext);
  const { openModal } = useContext(modalContext);
  const note = props.note;
  return (
    <div className="card col-md-3 mx-2 my-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title font-bold text-lg">{note.title}</h5>
        <p className="card-text my-6">{note.description}</p>
        <i
          className="fas fa-trash mx-3 cursor-pointer"
          onClick={() => {
            deleteNote(note._id);
          }}
        ></i>
        <i
          onClick={() => {
            openModal(note._id, note.title, note.description);
          }}
          className="far fa-edit mx-3 cursor-pointer"
        ></i>
      </div>
    </div>
  );
}
