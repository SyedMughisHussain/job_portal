import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dadvcuwkk",
  api_key: "593186932939832",
  api_secret: "PFPudJmXD9rckaWhJ6RP7e7Cf6M", // Click 'View API Keys' above to copy your API secret
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
