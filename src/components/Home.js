import React from "react";
import { useHistory } from "react-router-dom";
import AddNote from "./AddNote";
import Notes from "./Notes";

export default function Home(props) {
  let history = useHistory();
  let token = localStorage.getItem("token");
  if (!token) {
    history.push("/login");
  }
  return (
    <div className="my-20">
      <div className="align-left container my-3">
        <AddNote />
        <Notes />
      </div>
    </div>
  );
}
