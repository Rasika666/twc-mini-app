const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sk = require("../config/config").SECRET_KEY;

const auth = require("../middleware/auth");

function userRoutes(User) {
  const userRoute = express.Router();

  // @route       POST api/v1/auth/register
  // @decs        create user
  // @access      public
  userRoute.route("/register").post((req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ err: "all field must complete" });
    }
    //check if existance
    User.findOne({ email: email }).then((user) => {
      if (user) {
        return res.status(400).json({ err: "user already exists" });
      }

      const newuser = new User({
        username: username,
        email: email,
        password: password,
      });

      // hash the passowrd
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newuser.password, salt, (err, hash) => {
          if (err) throw err;
          newuser.password = hash; //hashing

          newuser.save().then((user) => {
            // create jwt token to user id
            jwt.sign({ id: user._id }, sk, (err, token) => {
              if (err) throw err;

              return res.status(200).json({
                token: token,
                user: {
                  _id: user._id,
                  username: user.username,
                  email: user.email,
                },
              });
            });
          });
        });
      });
    });
  });

  // @route       POST api/v1/auth/login
  // @decs        authenticate user
  // @access      public
  userRoute.route("/login").post((req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ err: "All field must complete" });
    }
    //check if existance
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(400).json({ err: "user does not exists" });
      }

      //compare passwords
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ err: "invalid credentials" });
        }

        // create jwt token to user id
        jwt.sign({ id: user._id }, sk, (err, token) => {
          if (err) throw err;

          return res.status(200).json({
            token: token,
            user: {
              _id: user._id,
              username: user.username,
              email: user.email,
            },
          });
        });
      });
    });
  });

  // @route       POST api/v1/auth/user
  // @decs        get authenticate user
  // @access      private
  userRoute.route("/user").get(auth, (req, res) => {
    User.findById(req.user.id)
      .select("-password")
      .then((user) => res.status(200).json(user));
  });

  return userRoute;
}

module.exports = userRoutes;
