import React from "react";
import { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
export default function AddNote() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const context = useContext(noteContext);
  const onTitleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const onDescriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const addNoteHandler = (e) => {
    e.preventDefault();
    context.addNote(title, description, "personal");
  };

  return (
    <div className="flex justify-center">
      <form className=" w-2/3">
        <h2 className="text-3xl">Add your Note</h2>
        <div className="mb-3 ">
          <label htmlFor="title" className="form-label my-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={onTitleChangeHandler}
            className="form-control"
            id="text"
            name="text"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            onChange={onDescriptionChangeHandler}
            value={description}
            name="description"
            rows={4}
            className="form-control"
            id="description"
          />
        </div>
        <button
          type="submit"
          onClick={addNoteHandler}
          className="btn bg-black text-white rounded-sm"
        >
          Add
        </button>
      </form>
    </div>
  );
}
