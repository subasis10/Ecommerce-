import React from "react";
import Slide from "./Slide";
import Banner from "./banner";
import "./home.css";
const Maincomp = () => {
  return (
    <div className="home_section">
      <div className="banner_part">
        <Banner />
      </div>
      <Slide />
    </div>
  );
};

export default Maincomp;
