const { 
    addToCart, 
    getCart, 
    removeFromCart,
    clearCart
} = require("../controllers/cartController");
const authenticateJWT = require("../middleware/authMiddleware");

const router = require("express").Router();


router.post('/cart/add', authenticateJWT, addToCart);
router.get('/carts', authenticateJWT, getCart);
router.delete('/cart/remove', authenticateJWT, removeFromCart);
router.delete('/cart/clear', authenticateJWT, clearCart);

module.exports = router;
