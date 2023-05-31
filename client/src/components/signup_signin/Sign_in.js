import React from "react";
import "./signUp.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

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

  return (
    <section>
      <div className="sign_container"></div>
      <div className="sign_form">
        <form>
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

          <button className="signin_btn">Continue</button>
        </form>
        {/* <ToastContainer /> */}
      </div>
      <div className="create_accountinfo">
        <NavLink to="/register">
          <button>Create your Account</button>
        </NavLink>
      </div>
    </section>
  );
};

export default Sign_in;
