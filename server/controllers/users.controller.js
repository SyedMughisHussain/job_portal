import User from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

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

const signIn = async (req, res) => {
  try {
    // Get data from frontend eg. email, password
    // Check if user is not signed up yet so give error back that first signup
    // We know that the user exists than we get data of user through email
    // Then we compare the password from the database hashed password
    // If the password is wrong then we return the error message ie. "Invalid password"
    // If matched then we generate a jwt token and send it to the user

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User does not exist!");
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password!");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "User signed in successfully!",
      token,
      user,
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

export { signUp, signIn };
