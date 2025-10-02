const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

// Create order from cart
exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const totalAmount = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = new Order({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      deliveryAddress: req.body.deliveryAddress,
      notes: req.body.notes
    });

    await order.save();

    // Clear cart
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get logged-in user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.product transaction");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
