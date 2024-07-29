const Users = require("../models/Users");
const { ApiResponse } = require("../utils/ApiResponse");

const addItems = async (req, res) => {
  const { items } = req.body;
  const userId = req.userId;

  try {
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).send(new ApiResponse(404, null, "User not found"));
    }

    items.forEach(item => {
      user.cartItem.push(item);
    });

    await user.save();
    res
      .status(200)
      .send(
        new ApiResponse(200, user.cartItem, "Cart items updated successfully")
      );
  } catch (error) {
    res
      .status(500)
      .send(
        new ApiResponse(500, null, "Error updating cart items", error.message)
      );
  }
};

const updateItems = async (req, res) => {};

const removeItem = async (req, res) => {};

const viewItems = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).send(new ApiResponse(404, null, "User not found"));
    }

    res.status(200).send(new ApiResponse(200, user.cartItem, "Cart items"));
  } catch (error) {
    return res.status(404).send(new ApiResponse(500, null, "InternalError"));
  }
};

module.exports = { addItems, removeItem, updateItems, viewItems };
