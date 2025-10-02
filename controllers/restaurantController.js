const restaurantModel = require('../models/restaurantModel');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.createRestaurant = async (req, res) => {
  try {
    const { restaurantName, location } = req.body;
  
    if (!restaurantName || !location) {
      return res.status(400).json({ 
        message: "Restaurant name and location are required" 
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Restaurant name is required"
      });
    }

    const filePath = req.file.path;
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "restaurants"
    });

    const fileInfo = {
      url: result.secure_url,
      publicId: result.public_id
    };
  
    fs.unlinkSync(filePath);

    const restaurant = new restaurantModel({
      restaurantName,
      location,
      restaurantImage: fileInfo
    });

    await restaurant.save();
    
    res.status(201).json({
      message: "Restaurant created successfully",
      data: restaurant
    });

    } catch (error) {
      res.status(500).json({
         error: error.message 
        });
    }
  };

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurant = await restaurantModel.find();
    
    res.status(200).json({
      message: `All Restaurant: ${restaurant.length}`,
      data: restaurant
    });

  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const {id} = req.params
    const restaurant = await restaurantModel.findById(id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    res.status(200).json({
      message: "Restaurant found",
      data: restaurant
    });

  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
};
