import modalContext from "./modalContext";
import { useState } from "react";

const ModalState = (props) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  const openModal = (id, title, description) => {
    setId(id);
    setTitle(title);
    setDescription(description);
    setModal(true);
  };
  return (
    <modalContext.Provider
      value={{ modal, openModal, title, description, id, setModal }}
    >
      {props.children}
    </modalContext.Provider>
  );
};

export default ModalState;
