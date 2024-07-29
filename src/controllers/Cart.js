const Carts = require("../models/Carts");
const { ApiResponse } = require("../utils/ApiResponse");

const addItems = async (req, res) => {
  const { items } = req.body; // Expecting an array of cart items
  const userId = req.userId;

  try {
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).send(new ApiResponse(404, null, "User not found"));
    }

    // Add new items or update existing items in the user's cart
    items.forEach((item) => {
      const index = user.cartItem.findIndex(
        (cartItem) => cartItem.productId === item.productId
      );
      if (index !== -1) {
        user.cartItem[index].quantity = item.quantity; // Update quantity if item exists
      } else {
        user.cartItem.push(item); // Add new item if not exists
      }
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

const viewItems = async (req, res) => {};

module.exports = { addItems, removeItem, updateItems, viewItems };
