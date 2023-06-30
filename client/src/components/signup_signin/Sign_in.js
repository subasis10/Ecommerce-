import React from "react";
import "./signUp.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sign_in = () => {
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });

  const adddata = (e) => {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { email, password } = logdata;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,

        password,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      console.log("invalid details");
      toast.warn("invalid details", {
        position: "top-center",
      });
    } else {
      console.log("data valid");
      toast.success("user valid", {
        position: "top-center",
      });
      setData({
        ...logdata,

        email: "",
        password: "",
      });
    }
  };

  return (
    <section>
      <div className="sign_container"></div>
      <div className="sign_form">
        <form method="POST">
          <h1>Sign-In</h1>

          <div className="form_data">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onChange={adddata}
              value={logdata.email}
              name="email"
              id="email"
            />
          </div>
          <div className="form_data">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={adddata}
              value={logdata.password}
              name="password"
              id="password"
              placeholder="at least 6 char"
            />
          </div>

          <button className="signin_btn" onClick={senddata}>
            Continue
          </button>
        </form>
        {/* <ToastContainer /> */}
      </div>
      <div className="create_accountinfo">
        <NavLink to="/register">
          <button>Create your Account</button>
        </NavLink>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Sign_in;
