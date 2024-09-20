import Job from "../models/job.model.js";

import mongoose from "mongoose";

const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      category,
      jobType,
      experience,
      noOfPositions,
      company,
    } = req.body;

    const payload = {
      title,
      description,
      requirements,
      salary,
      location,
      category,
      jobType,
      experience,
      noOfPositions,
      company,
    };

    // Validate if category and company are valid ObjectId
    if (!mongoose.isValidObjectId(category)) {
        return res.status(400).json({
          message: "Invalid category ID format.",
          error: true,
          success: false,
        });
      }
  
      if (!mongoose.isValidObjectId(company)) {
        return res.status(400).json({
          message: "Invalid company ID format.",
          error: true,
          success: false,
        });
      }

    const job = await Job.create(payload);

    res.status(201).json({
      message: "Job created successfully!",
      job: job,
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

export { createJob };