const { 
    addToCart, 
    getCart, 
    removeFromCart,
    clearCart
} = require("../controllers/cartController");
const authenticateJWT = require("../middleware/authMiddleware");

const router = require("express").Router();


router.post("/add", authenticateJWT, addToCart);
router.get("/", authenticateJWT, getCart);
router.delete("/remove", authenticateJWT, removeFromCart);
router.delete("/clear", authenticateJWT, clearCart);

module.exports = router;
