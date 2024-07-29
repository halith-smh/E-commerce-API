const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ApiResponse } = require("../utils/ApiResponse");

const Users = require("../models/Users");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .send(new ApiResponse(400, null, "Missing required fields"));
  }

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "User already exists"));
    }

    const saltRounds = parseInt(process.env.SALT) || 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const user = await Users.create({ name, email, password: hash });
    const response = new ApiResponse(
      200,
      { name, email },
      "User Registered Successfully"
    );
    res.status(200).send(response);
  } catch (error) {
    const errorMessage =
      error.message || "An error occurred during registration";
    res.status(500).send(new ApiResponse(500, null, errorMessage));
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send(new ApiResponse(400, null, "Email and password are required"));
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send(new ApiResponse(400, null, "Invalid email or password"));
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send(new ApiResponse(400, null, "Invalid email or password"));
    }

    const secretKey = process.env.JWT_TOKEN;
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1d" });

    res.status(200).send(new ApiResponse(200, { token }, "User login successful"));

  } catch (error) {
    console.error('Login error:', error); 
    res.status(500).send(new ApiResponse(500, null, "Error logging in"));
  }
};

module.exports = { register, login };
