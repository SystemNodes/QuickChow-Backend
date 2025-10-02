const router = require('express').Router();
const { 
    createOrder, 
    getMyOrders 
} = require('../controllers/orderController');
const authenticateJWT = require('../middleware/authMiddleware');

router.post('/orders', authenticateJWT, createOrder);
router.get('/orders', authenticateJWT, getMyOrders);


module.exports = router;
