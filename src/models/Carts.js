const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    name: {
        type: String,
        required: [true, "Item name should be present"]
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = Carts = mongoose.model("carts", CartSchema);
