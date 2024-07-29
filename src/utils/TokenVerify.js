const jwt = require("jsonwebtoken");

const Tokenverify = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(401).send("Unauthorized: Token not provided");
    }

    const d_token = jwt.verify(token, process.env.JWT_TOKEN);

    if (d_token) {
      req.userId = d_token.userId;
      try {
        const user = await Users.findById(userId);

        if (!user) {
          return res
            .status(404)
            .send(new ApiResponse(404, null, "User not found"));
        }

        req.user = user;
        next();
      } catch (error) {
        console.log(error);
        return res.status(500).send("Error Occured: " + error.message);
      }

      next();
    } else {
      return res.status(401).send("Unauthorized: Token Invalid");
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = Tokenverify;
