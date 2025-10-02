const router = require('express').Router();
const { 
    createRestaurant, 
    getAllRestaurants, 
    getRestaurantById
} = require('../controllers/restaurantController');
const upload = require('../middleware/multer');

router.post('/restaurants', upload.single('restaurantImage'), createRestaurant);
router.get('/restaurants', getAllRestaurants);
router.get('/restaurants/:id', getRestaurantById);

module.exports = router;