const express = require("express");
const auth = require("../middleware/auth");

//multer setups
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

function routes(DummyUser) {
  const dummyRoute = express.Router();

  // @route       POST api/v1/dummyuser
  // @decs        create new dummy user
  // @access      private
  dummyRoute.route("/dummyuser").post(upload.single("avatar"),auth, (req, res) => {
    console.log("call dummyuser(POST)");
    const dummyuser = new DummyUser({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      avatar: req.file.path,
    });
    dummyuser
      .save()
      .then((result) => {
        return res.status(201).json({
          name: result.name,
          email: result.email,
          phoneNumber: result.email,
          avatar: result.avatar,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  });

  // @route       GET api/v1/dummyuser
  // @decs        retreive all dummy users
  // @access      private
  dummyRoute.route("/dummyusers").get(auth, (req, res) => {
    console.log("call dummyusers(GET)");
    DummyUser.find()
      .select(" _id name email phoneNumber avatar")
      .exec()
      .then((docs) => {
        const results = docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            email: doc.email,
            phoneNumber: doc.phoneNumber,
            avatar: doc.avatar,
          };
        });

        return res.status(200).json(results);
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  });

  // @route       middlware api/v1/dummyuser/:userId
  // @decs        middleware for get one dummy user
  // @access      private
  dummyRoute.use("/dummyuser/:userId", (req, res, next) => {
    console.log("call /dummyuser/:userId (MIDDLEWARE)");
    DummyUser.findById(req.params.userId)
      .then((dummyuser) => {
        if (dummyuser) {
          req.dummyuser = dummyuser;
          return next();
        }
        return res.status(200).json(dummyuser);
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  });

  // @route       DELETE api/v1/dummyuser/:userId
  // @decs        delete one dummy user
  // @access      private
  dummyRoute
    .route("/dummyuser/:userId")
    .delete(auth, (req, res) => {
      req.dummyuser.deleteOne((err) => {
        if (err) {
          return res.status(500).json(err);
        }

        return res.sendStatus(204);
      });
    })
    // @route       PATCH api/v1/dummyuser/:userId
    // @decs        update one dummy user
    // @access      private
    .patch(auth, (req, res) => {
      const { dummyuser } = req;

      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const values = item[1];
        dummyuser[key] = values;
      });

      req.dummyuser.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.status(200).json(dummyuser);
      });
    });

  return dummyRoute;
}

module.exports = routes;
