import React, { useEffect } from "react";
import Slide from "./Slide";
import Banner from "./banner";
import "./home.css";
import { getProducts } from "../redux/action/action";
import { useDispatch, useSelector } from "react-redux";

const Maincomp = () => {
  const { products } = useSelector((state) => state.getproductsdata);
  console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="home_section">
      <div className="banner_part">
        <Banner />
      </div>
      <Slide title="Deal of the Day" products={products} />
    </div>
  );
};

export default Maincomp;
