import "./App.css";
import Navbaar from "./components/header/Navbaar";
import Maincomp from "./components/home/Maincomp";
import Sign_in from "./components/signup_signin/Sign_in";
import SignUp from "./components/signup_signin/SignUp";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Buynow from "./components/buynow/Buynow";

function App() {
  return (
    <>
      <Navbaar />
      <Routes>
        <Route path="/" element={<Maincomp />} />
        <Route path="/login" element={<Sign_in />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/getproductsone/:id" element={<Cart />} />
        <Route path="/buynow" element={<Buynow />} />
      </Routes>
    </>
  );
}

export default App;
