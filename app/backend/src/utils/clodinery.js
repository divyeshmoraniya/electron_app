import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({
    path: ".env"
})
cloudinary.config({
    cloud_name: process.env.CLOUDINERY_NAME,
    api_key: process.env.CLOUDINERY_KEY,
    api_secret: process.env.CLOUDINERY_SECRET_KEY 
});

 const uploadoncloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "uploads", // optional: Cloudinary folder name
      resource_type: "auto",
    });

    // Remove the local file after successful upload
    fs.unlinkSync(localFilePath);

    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    fs.unlinkSync(localFilePath); // remove local file even if failed
    return null;
  }
};

const deleteCloudnery = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return result;

    } catch (error) {
        console.log("Cloudinary delete Error:", error);
        return null;
    }
}

export { uploadoncloudinary, deleteCloudnery };