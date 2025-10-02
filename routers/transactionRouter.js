const { 
    initializePayment, 
    verifyPayment 
} = require('../controllers/transactionController');

const router = require('express').Router();

router.post('/initialize/payment', initializePayment);
router.get('/verify/payment', verifyPayment);


module.exports = router;
