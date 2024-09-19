import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(filePath); // Delete the local file after upload
    return uploadResult.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
};

export { uploadOnCloudinary };
