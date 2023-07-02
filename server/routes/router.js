const express = require("express");
const router = new express.Router();
const products = require("../models/productSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

//get productsdata api
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
    console.log(userlogin);

    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      console.log(isMatch);

      //token generate
      const token = await userlogin.generateAuthToken();
      console.log(token);

      res.cookie("Ecom", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "invalid details" });
      } else {
        res.status(201).json(userlogin);
      }
    } else {
      res.status(400).json({ error: "invalid details" });
    }
  } catch (error) {
    res.status(400).json({ error: "invalid details" });
  }
});

//adding the data into cart

router.post("/addcart/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await products.findOne({ id: id });
    console.log(cart + "cart value");

    const UserContact = await USER.findOne({ _id: req.userID });
    console.log(UserContact);

    if (UserContact) {
      const cartData = await UserContact.addcartdata(cart);
      await UserContact.save();
      console.log(cartData);
      res.status(201).json(UserContact);
    } else {
      res.status(401).json({ error: "invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: "invalid user" });
  }
});

// get cart details
router.get("/cartdetails", authenticate, async (req, res) => {
  try {
    const buyuser = await USER.findOne({ _id: req.userID });
    console.log(buyuser);
    res.status(201).json(buyuser);
  } catch (error) {
    console.log(error + "error for buy now");
  }
});

//get valid user

router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validuserone = await USER.findOne({ _id: req.userID });

    res.status(201).json(validuserone);
  } catch (error) {
    console.log(error + "error ");
  }
});

module.exports = router;
