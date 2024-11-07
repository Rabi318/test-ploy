const { v2 } = require("cloudinary");
const fs = require("fs");

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  // console.log("LocalPath===>", localFilePath);
  try {
    if (!localFilePath) return null;
    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log("File is uploaded successfully on cloudinary", response.url);

    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Error deleting : ", err);
    });
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Error deleting : ", err);
    });
    return null;
  }
};
const uploadPdfOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "auto",
      format: "pdf",
    });
    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Error deleting PDF: ", err);
    });
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Error deleting PDF: ", err);
    });
    return null;
  }
};

module.exports = { uploadOnCloudinary, uploadPdfOnCloudinary };
