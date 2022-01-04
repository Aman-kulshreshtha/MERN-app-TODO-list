import React from "react";
import { useState } from "react";
import { useContext } from "react";
import modalContext from "../context/Modal/modalContext";
import noteContext from "../context/notes/noteContext";
function Modal() {
  const { id, description, title, setModal } = useContext(modalContext);
  const [i, setId] = useState(id);
  const [desc, setDescription] = useState(description);
  const [t, setTitle] = useState(title);
  const onTitleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const { editNote } = useContext(noteContext);
  const confirmEdit = () => {
    editNote(i, t, desc, "personal");
    setModal(false);
  };

  const onDescriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const closeModal = () => {
    setId("");
    setDescription("");
    setTitle("");
    setModal(false);
  };
  return (
    <div className="min-h-screen bg-gray-50 py-2 flex flex-col justify-center relative overflow-hidden sm:py-12">
      <div className="relative px-6 pt-10 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 sm:max-w-lg sm:mx-auto sm:rounded-lg sm:px-10">
        <div className="max-w-lg mx-auto"></div>
        <div className="text-left">
          <form className="">
            <h2 className=" text-lg">Edit your Note</h2>
            <div className="mb-3 ">
              <label htmlFor="title" className="form-label my-2">
                Title
              </label>
              <input
                type="text"
                value={t}
                onChange={onTitleChangeHandler}
                className="form-control"
                id="text"
                name="text"
              />
            </div>
            <div className="">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                onChange={onDescriptionChangeHandler}
                value={desc}
                name="description"
                rows={4}
                className="form-control"
                id="description"
              />
            </div>
          </form>
        </div>
        <div className="my-6">
          <button
            onClick={confirmEdit}
            className=" bg-black mx-2 px-6 py-2 text-white rounded-md  "
          >
            Continue
          </button>
          <button
            onClick={closeModal}
            className=" bg-red-600 mx-2 px-6 py-2 text-white rounded-md "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
