import Job from "../models/job.model.js";

import mongoose from "mongoose";

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json({
      message: "All jobs retrieved successfully!",
      jobs,
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

const editJob = async (req, res) => {
  try {
    const { id } = req.params;

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

    const job = await Job.findByIdAndUpdate(id, payload, { new: true });

    res.status(200).json({
      message: "Job updated successfully!",
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

const applicant = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        error: true,
        success: false,
      });
    }

    if (job.applicants.includes(loggedInUser._id)) {
      return res.status(400).json({
        message: "User already applied for this job.",
        error: true,
        success: false,
      });
    }

    job.applicants.push(loggedInUser._id);
    await job.save();

    res.status(200).json({
      message: "Application submitted successfully!",
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

export { createJob, getAllJobs, editJob, applicant };
