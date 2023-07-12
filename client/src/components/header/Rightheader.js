import React from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginContext } from "../context/ContextProvider";
import "./rightheader.css";
import { Divider } from "@mui/material";

const Rightheader = ({ Logclose }) => {
  const { account, setAccount } = useContext(LoginContext);
  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
          {account ? (
            <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avtar" />
          )}
          {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""}
        </div>
        <div className="nav_btn" onClick={() => Logclose()}>
          <NavLink to="/">Home</NavLink>
          {/* <NavLink to="/">Shop By Category</NavLink> */}
          {/* <Divider style={{ width: "100%", marginLeft: -20 }} /> */}
          {/* <NavLink to="/" style={{ marginTop: 10 }}>
            Today's Deal
          </NavLink> */}
          {account ? (
            <NavLink to="/buynow">Your Order</NavLink>
          ) : (
            <NavLink to="/login">Your Order</NavLink>
          )}
          <Divider style={{ width: "100%", marginLeft: -20 }} />
          <div className="flag">
            <NavLink to="" style={{ marginTop: 14 }}>
              Settings
            </NavLink>
          </div>
          <NavLink to="/login">Sign in</NavLink>
        </div>
      </div>
    </>
  );
};

export default Rightheader;
