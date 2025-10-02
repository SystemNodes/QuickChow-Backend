const { 
    createCategory, 
    getAllCategories, 
    getCategoryById 
} = require('../controllers/categoryCntroller');

const router = require('express').Router();

router.post('/category', createCategory);
router.get('/category', getAllCategories);
router.get('/category/:id', getCategoryById)

module.exports = router;
