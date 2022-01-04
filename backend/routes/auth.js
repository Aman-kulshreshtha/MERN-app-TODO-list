const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUser = require("../middlewares/getUser");

const JWT_SECRET = "someverySensiti$veString@!!";

router.get("/", (req, res) => {
  const obj = {};
  res.json(obj);
});

// end point to create a user POST /api/auth/create-user // no login requred
router.post(
  "/create-user",
  [
    body("name").isLength({ min: 3 }),
    body("password").isLength({ min: 6 }),
    body("email").isEmail(),
  ],
  //if errors send bad request and errors
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "User with the entered email already exists !!",
          });
      }

      const salt = await bcrypt.genSalt(10);
      const pass = req.body.password;
      const passHash = await bcrypt.hash(pass, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: passHash,
      });
      // .then((user) => res.json(user))
      // .catch((err) => {
      //   console.log(err);
      //   res.json({ error: "Enter Unique Email" });
      // });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error);

      res.status(500).send("Some error occured");
    }
  }
);

// endpoint to authenticate a user POST /api/auth/login // no login required

router.post(
  "/login",
  [body("password").exists(), body("email").isEmail()],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ success, errors: "Invalid credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, errors: "Invalid credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      res.status(500).send("Some error occured");
    }
  }
);

// endpoint to authenticate a user POST /api/auth/getuser //  login required

router.post("/getuser", getUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
