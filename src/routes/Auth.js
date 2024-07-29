const express = require('express');
const { register, login } = require('../controllers/Auth');

const Authrouter = express.Router();

Authrouter.route("/register").post(register);
Authrouter.route("/login").post(login);

module.exports = Authrouter;