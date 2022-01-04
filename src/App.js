import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Modal from "./components/Modal";
import modalContext from "./context/Modal/modalContext";
import { useContext } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const modContext = useContext(modalContext);

  const modal = modContext.modal;

  return (
    <>
      <NoteState>
        <div className="App">
          <Router>
            <NavBar />
            <div className="body py-15">
              <div className="container">
                <Switch>
                  <Route exact path="/">
                    {!modal && <Home />}
                    {modal && <Modal />}
                  </Route>
                  <Route exact path="/about">
                    <About />
                  </Route>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route exact path="/signup">
                    <Signup />
                  </Route>
                </Switch>
              </div>
            </div>
          </Router>
        </div>
      </NoteState>
    </>
  );
}

export default App;
