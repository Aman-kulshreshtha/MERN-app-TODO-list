import React from "react";
import { useHistory } from "react-router-dom";

function Signup() {
  let history = useHistory();
  const signupHandler = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const pass = e.target[2].value;
    const cpass = e.target[3].value;
    if (pass !== cpass) {
      alert("Passwords don't match");
    } else {
      const response = await fetch(
        `http://localhost:5000/api/auth/create-user`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email: email, password: pass }),
        }
      );
      const json = await response.json();

      if (!json.success) {
        alert("Invalid Fields");
      } else {
        console.log(json);
        history.push("/login");
      }
    }
  };
  return (
    <div className="flex justify-center h-screen py-15  align-middle max-h-screen max-w-screen bg-slate-50">
      <div className=" flex shadow-lg mt-20 rounded-md my-10 text-left  px-10 bg-white">
        <div className="login-input py-20">
          <div>
            <h2 className="font-bold underline text-2xl">
              Signup for yourcloud Notebook
            </h2>
            <form onSubmit={signupHandler}>
              <div className="ml-10">
                <label className="font-bold text-lg mt-10">Name</label>
                <div>
                  <input
                    type="text"
                    className=" w-60 justify-center border-2  "
                    name="name"
                    id="name"
                  />
                </div>
              </div>
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
              <div className="ml-10 w-3/5">
                <label className="font-bold text-lg mt-10">
                  Confirm Password
                </label>
                <div>
                  <input
                    type="password"
                    className=" w-60 justify-center border-2"
                    name="cpassword"
                    id="cpassword"
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
    </div>
  );
}

export default Signup;
