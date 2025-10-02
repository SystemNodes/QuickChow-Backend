const productModel = require('../models/productModel');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.createProduct = async (req, res) => {
    try {
        const {productName, price, restaurantId, categoryId } = req.body;

        if (!productName || !price || !restaurantId || !categoryId ) {
            return res.status(400).json({
                message: "The following fields are all required: productName, price, restaurantId, categoryId"
            });
        };

        if (!req.file) {
            return res.status(400).json({ 
                message: "Product image is required" 
            });
        };

        const filePath = req.file.path;
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "products"
        });
    
        const fileInfo = {
          url: result.secure_url,
          publicId: result.public_id
        };
    
        fs.unlinkSync(filePath);
      
        const product = new productModel({
            productName,
            price,
            productImage: fileInfo,
            restaurantId,
            categoryId
        });

        await product.save();

        res.status(201).json({
            message: "Product sucessfully created",
            data: product
        });
    
    } catch (err) {
        res.status(500).json({ 
            error: err.message 
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find()
            .populate("restaurantId", "restaurantName location")
            .populate("categoryId", "categoryName");

        res.status(200).json({
            message: "All products in QuickChow delivery application",
            data: products
        });

    } catch (err) {
        res.status(500).json({ 
            error: err.message 
        });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await productModel.find(categoryId)
            .populate("restaurantId", "restaurantName location")
            .populate("categoryId", "categoryName");

        res.status(200).json({
            message: "Products fetched by Categories",
            data: products
        });

    } catch (err) {
        res.status(500).json({ 
            error: err.message 
        });
    }
};

exports.getProductsByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const products = await Product.find(restaurantId)
            .populate("restaurantId", "restaurantName location")
            .populate("categoryId", "categoryName");
        
        res.status(200).json({
            message: "Products fetched by Restaurants",
            data: products
        });

    } catch (err) {
        res.status(500).json({
             error: err.message 
        });
    }
};
  
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id)
            .populate("restaurantId", "restaurantName location")
            .populate("categoryId", "categoryName");

        if (!product) return res.status(404).json({ error: "Product not found" });
      
        res.status(200).json({
            message: "Product found",
            data: products
        });
        
    } catch (err) {
        res.status(500).json({ 
            error: err.message 
        });
    }
};

