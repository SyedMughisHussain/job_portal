import User from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";

import bcrypt from "bcryptjs";

const signUp = async (req, res) => {
  try {
    const { fullName, email, phoneNo, password } = req.body;

    const file = req.file.path;

    console.log(file);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists!");
    }

    // Hashing password functionality
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const filePath = req.file.path;

    const uploadResult = await uploadOnCloudinary(filePath);

    if (!uploadResult) {
      throw new Error("Error uploading profile picture to Cloudinary");
    }

    const payload = {
      fullName,
      email,
      phoneNo,
      password: hash,
      profile: uploadResult,
    };

    const user = await User.create(payload);

    res.status(201).json({
      message: "User registered successfully!",
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
      error: true,
      succes: false,
    });
  }
};

export { signUp };
