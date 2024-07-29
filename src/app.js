const express = require('express');
const cors = require("cors");
const { ApiResponse } = require('./utils/ApiResponse');

require("dotenv").config();

const Authrouter = require("./routes/Auth");
const Cartrouter = require('./routes/Cart');
const Tokenverify = require('./utils/TokenVerify');

const app = express();

app.use(express.json({limit: "16kb"}));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use((req, res, next) => {
    const {method, path, ip} = req;
    console.log(method, path, ip);
    next();
})

//test-route
app.get("/test", (req, res) => {
    const response = new ApiResponse(200);
    res.send(response);
});

// User Authentication
app.use("/api/auth", Authrouter);

// Shopping Cart
app.use("/api/cart/", Tokenverify, Cartrouter);






module.exports = {app}