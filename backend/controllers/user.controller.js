const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const User = require("../models/user.models.js");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field.trim() === "")) {
    throw new apiError(400, "All fields are required.");
  }
  const profileImagePath = req.files?.profileImage[0]?.path;
  if (!profileImagePath) {
    throw new apiError(400, "profile image path not provided");
  }
  const profileImage = await uploadOnCloudinary(profileImagePath);
  if (!profileImage) {
    throw new apiError(400, "profile image is required");
  }

  const user = await User.create({
    username,
    email,
    password,
    profileImage: profileImage.url,
  });

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new apiError(500, "Something went wrong while creating user");
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User registered successfully"));
});

module.exports = registerUser;
