const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { deliveryAddress, notes } = req.body;

    const cart = await cartModel.findOne({ userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map(item => ({
      productId: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const totalAmount = orderItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = new orderModel({
      userId,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      notes
    });

    await order.save();

    await cartModel.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({
      message: "Order created successfully",
      data: order
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel
      .find({ userId })
      .populate("items.productId")
      .populate("transactionId");

    res.status(200).json({
      message: "Orders fetched successfully",
      data: orders
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
