const express = require('express');
const { addItems, updateItems, removeItem, viewItems } = require('../controllers/Cart');

const Cartrouter = express.Router();

Cartrouter.route("/").post(addItems);
Cartrouter.route("/").patch(updateItems);
Cartrouter.route("/").delete(removeItem);
Cartrouter.route("/").get(viewItems);

module.exports = Cartrouter;

