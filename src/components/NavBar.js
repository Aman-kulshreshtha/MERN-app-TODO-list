import React from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

export default function NavBar() {
  const context = useContext(noteContext);
  let history = useHistory();
  let location = useLocation();
  let token = localStorage.getItem("token");
  const logoutHandler = () => {
    localStorage.removeItem("token");
    context.clearNotes();
    history.push("/login");
  };

  return (
    <>
      <nav className=" absolute w-screen navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand mx-4 font-bold text-xl" to="/">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!token && (
              <ul className="flex ">
                <li className="text-white mx-1 px-2">
                  <Link to="/login" className=" hover:text-white ">
                    Login
                  </Link>
                </li>
                <li className="text-white mx-1 px-2">
                  <Link to="/signup" className=" hover:text-white ">
                    Signup
                  </Link>
                </li>
              </ul>
            )}
            {token && (
              <ul className="flex ">
                <li className="text-white mx-1 px-2">
                  <button
                    onClick={logoutHandler}
                    className=" hover:text-white "
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
