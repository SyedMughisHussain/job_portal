import { uploadOnCloudinary } from "../utils/cloudinary.util.js";

import Company from "../models/company.model.js";

const getAllCompany = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json({
      message: "Companies fetched successfully!",
      companies,
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

const createCompany = async (req, res) => {
  try {
    const { name, description, websiteLink, location } = req.body;

    const filePath = req.file.path;

    const url = await uploadOnCloudinary(filePath);

    if (!url) {
      throw new Error("Error uploading logo to Cloudinary!");
    }

    const payload = {
      name,
      description,
      websiteLink,
      location,
      logo: url,
    };

    const company = await Company.create(payload);

    res.status(201).json({
      message: "Company created successfully!",
      company,
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

const editCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, websiteLink, location } = req.body;

    const company = await Company.findById(id);

    if (req.file) {
      const filePath = req.file.path;

      const url = await uploadOnCloudinary(filePath);

      const payload = {
        name,
        description,
        websiteLink,
        location,
        logo: url,
      };

      const updatedCompany = await Company.findByIdAndUpdate(id, payload, {
        new: true,
      });

      res.status(200).json({
        message: "Company updated successfully!",
        company: updatedCompany,
        success: true,
      });
    } else {
      const payload = {
        name,
        description,
        websiteLink,
        location,
        logo: company.logo,
      };

      const updatedCompany = await Company.findByIdAndUpdate(id, payload, {
        new: true,
      });

      res.status(200).json({
        message: "Company updated successfully!",
        company: updatedCompany,
        success: true,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export { createCompany, editCompany, getAllCompany };
