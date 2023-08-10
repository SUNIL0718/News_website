const express = require("express");
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

const router = new express.Router();

// for user registration.

router.post("/register", async (req, res) => {
  //   console.log(req.body);
  const { fname, email, password, cpassword } = req.body;

  if (!fname || !email || !password || !cpassword) {
    res.status(422).json({ error: "Fill all details" });
  }
  try {
    const preuser = await userdb.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "This email is already exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "Confirm password not match" });
    } else {
      const finalUser = new userdb({
        fname,
        email,
        password,
        cpassword,
      });
      //Password Hashing
      const storeData = await finalUser.save();
      // console.log(storeData);
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(422).json({ error });
    console.log("Catch block error");
  }
});

//User Login

router.post("/login", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: "Fill all details" });
  }
  try {
    const userValid = await userdb.findOne({ email: email });

    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch) {
        res.status(422).json({ error: "Invalid Password" });
      } else {
        //token generate
        const token = await userValid.generateAuthtoken();
        // console.log(token);

        //cookie generate
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });
        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("Catch block");
  }
});

// User Validate

router.get("/validuser", authenticate, async (req, res) => {
  // console.log("done, User authorized");
  try {
    const validUserOne = await userdb.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, validUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});
module.exports = router;
