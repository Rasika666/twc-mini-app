const sk = require("../config/config").SECRET_KEY;
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ err: "Authorization denied" });
  }

  try {
    //get user id from token
    const decode_token = jwt.verify(token, sk);

    req.user = decode_token;
    next();
  } catch (e) {
    return res.status(400).json({ err: "Token not Valid" });
  }
};

module.exports = auth;
