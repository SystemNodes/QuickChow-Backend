const categoryModel = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
    try {
      const { categoryName, restaurantId } = req.body;
  
      if (!categoryName || !restaurantId) {
        return res.status(400).json({ message: "Category Name and restaurant ID are required" });
      }

      const existingCategory = await categoryModel.findOne({
        categoryName: category.trim(),
        restaurantId
      });
  
      if (existingCategory) {
        return res.status(409).json({
          message: "Category already exists for this restaurant"
        });
      }

      const category = await categoryModel.create({ categoryName, restaurantId });
      res.status(201).json({
        message: "Category created successfully",
        data: category
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({
      message: `All product categories: ${categories.length}`,
      data: categories
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const {id} = req.params
    const category = await categoryModel.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({
      message: "Category Found",
      data: category
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
