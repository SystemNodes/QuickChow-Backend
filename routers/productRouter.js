const router = require('express').Router();
const { 
    createProduct, 
    getAllProducts, 
    getProductsByCategory,
    getProductsByRestaurant,
    getProduct
} = require('../controllers/productController');
const upload = require('../middleware/multer');

router.post('/products', upload.single('productImage'), createProduct);
router.get('/products', getAllProducts);
router.get('products/category/:categoryId', getProductsByCategory);
router.get('/products/restaurant/:restaurantId', getProductsByRestaurant);
router.get('/products/:id', getProduct);

module.exports = router;
