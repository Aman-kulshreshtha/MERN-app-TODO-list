import React from "react";
import { useHistory } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

function Login() {
  let history = useHistory();
  let context = useContext(noteContext);

  const loginHandler = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const pass = e.target[1].value;
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: pass }),
    });
    const json = await response.json();

    if (!json.success) {
      alert("Invalid Credentials");
    } else {
      localStorage.setItem("token", json["authToken"]);
      context.fetchAllNotes();
      history.push("/");
    }
  };
  return (
    <div className="flex justify-center h-screen py-15  align-middle max-h-screen max-w-screen bg-slate-50">
      <div className=" flex shadow-lg mt-20 rounded-md h-2/3 text-left  px-10 bg-white">
        <div className="login-input py-20">
          <h2 className="font-bold underline text-2xl">
            Login to your cloud Notebook
          </h2>
          <form onSubmit={loginHandler}>
            <div className="ml-10">
              <label className="font-bold text-lg mt-10">Email</label>
              <div>
                <input
                  type="text"
                  className=" w-60 justify-center border-2  "
                  name="email"
                  id="email"
                />
              </div>
            </div>
            <div className="ml-10 w-3/5">
              <label className="font-bold text-lg mt-10">Password</label>
              <div>
                <input
                  type="password"
                  className=" w-60 justify-center border-2"
                  name="password"
                  id="password"
                />
              </div>
            </div>

            <div className="text-center ml-24 mt-10 flex buttons rounded-md">
              <button
                type="submit"
                className="px-10 py-2 bg-black text-white font-bold text-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
