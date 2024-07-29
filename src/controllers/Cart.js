const Users = require("../models/Users");
const { ApiResponse } = require("../utils/ApiResponse");

const addItems = async (req, res) => {
  const { item } = req.body;
  const userId = req.userId;

  try {
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).send(new ApiResponse(404, null, "User not found"));
    }

    user.cartItem.push(item);
    await user.save();
    res
      .status(200)
      .send(
        new ApiResponse(200, item, "Cart items added successfully")
      );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        new ApiResponse(500, null, "Error updating cart items", error.message)
      );
  }
};

const updateItems = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  try {
    const user = await Users.findById(userId);

    
    if (!user) {
      return res.status(404).send(new ApiResponse(404, null, "User not found"));
    }

    const index = user.cartItem.findIndex(
      (item) => item.productId === productId
    );
    if (index === -1) {
      return res.status(404).send(new ApiResponse(404, null, "Item not found"));
    }

    user.cartItem[index].quantity = quantity;
    await user.save();

    res
      .status(200)
      .send(new ApiResponse(200, user.cartItem[index], "Cart item quantity updated"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occured");
  }
};

const removeItem = async (req, res) => {
  const { productId } = req.body;
  const userId = req.userId;


  try {
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).send(new ApiResponse(404, null, "User not found"));
    }

    const index = user.cartItem.findIndex(
      (item) => item.productId === productId
    );

    if (index === -1) {
      return res.status(404).send(new ApiResponse(404, null, "Item not found"));
    }
    user.cartItem.splice(index, 1);

    await user.save();

    res
      .status(200)
      .send(new ApiResponse(200, user.cartItem, "Item removed from cart"));
  } catch (error) {
    res.status(500).send("Error occured");
  }
};

const viewItems = async (req, res) => {
   const userId = req.userId;

  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send(new ApiResponse(404, null, "User not found"));
    }

    res
      .status(200)
      .send(new ApiResponse(200, user.cartItem, "Cart items"));
  } catch (error) {
    console.error(error);
    return res.status(404).send(new ApiResponse(500, null, "Internal Error"));
  }
};

module.exports = { addItems, removeItem, updateItems, viewItems };
