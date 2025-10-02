const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = new cartModel({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(
            i => i.product.toString() === productId
        );

        const qty = Number(quantity) > 0 ? Number(quantity) : 1;

        if (itemIndex >= 0) {
            cart.items[itemIndex].quantity += qty;
        } else {
            cart.items.push({ product: productId, quantity: qty });
        }

        await cart.save();

        const populatedCart = await cart.populate(
            "items.product",
            "productName price productImage"
        );

        res.status(200).json({
            message: "Item(s) added to cart",
            data: populatedCart
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await cartModel
            .findOne({ userId })
            .populate("items.product", "productName price productImage");

        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.status(200).json({
            message: "Cart found",
            data: cart
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            message: "Item removed from cart",
            data: cart
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({ message: "Cart cleared" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
