import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function About() {
  const context = useContext(noteContext);
  return (
    <div>
      <h1>This is about</h1>
    </div>
  );
}
