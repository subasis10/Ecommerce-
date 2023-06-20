const express = require("express");
const router = new express.Router();
const products = require("../models/productSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");

router.get("/getproducts", async (req, res) => {
  try {
    const producstdata = await products.find();
    /*  console.log("console the data" + producstdata); */
    res.status(201).json(producstdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

//get individual data
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    /*   console.log(id); */

    const individual = await products.findOne({ id: id });
    /*  console.log(individual); */

    res.status(201).json(individual);
  } catch (error) {
    res.status(400).json(error);
  }
});

//register data

router.post("/register", async (req, res) => {
  console.log(req.body);

  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "fill all data" });
  }
  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "this user already exists" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password and cpassword not match" });
    } else {
      const finalUser = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });
      const storedata = await finalUser.save();

      res.status(201).json(storedata);
    }
  } catch (error) {}
});

//login user api

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill all data" });
  }

  try {
    const userlogin = await USER.findOne({ email: email });
    /*   console.log(userlogin); */

    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      console.log(isMatch);

      if (!isMatch) {
        res.status(400).json({ error: "invalid details" });
      } else {
        res.status(201).json(userlogin);
      }
    }
  } catch (error) {
    res.status(400).json({ error: "invalid details" });
  }
});

module.exports = router;
