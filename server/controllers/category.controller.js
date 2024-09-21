import Category from "../models/category.model.js";

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      message: "Categories retrieved successfully!",
      categories,
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const payload = {
      name,
    };

    const category = await Category.create(payload);

    res.status(201).json({
      message: "Category created successfully!",
      category,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export { createCategory, getAllCategory };
