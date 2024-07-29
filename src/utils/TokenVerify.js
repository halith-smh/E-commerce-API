const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const Tokenverify = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res
        .status(401)
        .send(new ApiResponse(401, null, "Unauthorized: Token not provided"));
    }

    const d_token = jwt.verify(token, process.env.JWT_TOKEN);

    req.userId = d_token.userId;
    next();
  } catch (error) {
    res.status(500).send(new ApiResponse(401, null, "Authentication Error", error.message));
  }
};

module.exports = Tokenverify;
