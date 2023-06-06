const express = require("express");
const router = new express.Router();
const products = require("../models/productSchema");

// router.get("/",(req,res)=>{
//     res.send("this is testing routes");
// });

// get the productsdata api

router.get("/getproducts", async (req, res) => {
  try {
    const producstdata = await products.find();
    /* console.log("console the data" + producstdata); */
    res.status(201).json(producstdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

module.exports = router;
