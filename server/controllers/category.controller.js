import Category from "../models/category.model.js";

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

export { createCategory };