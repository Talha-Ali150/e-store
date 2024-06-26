const asyncHandler = require("../utils/asyncHandler.js");
// const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const User = require("../models/user.models.js");
const jwt = require("jsonwebtoken");

const generateAccessAndRefreshTokens = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    // throw new apiError(
    //   500,
    //   "Something went wrong while generating access and refresh token"
    // );
    return res.status(500).json({
      error: {
        message:
          "Something went wrong while generating access and refresh token",
      },
    });
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin,profileImage } = req.body;

  if ([username, email, password,profileImage].some((field) => field.trim() === "")) {
    // throw new apiError(400, "All fields are required.");
    return res.status(400).json({
      error: {
        message: "All fields are required",
      },
    });
  }
  // const profileImagePath = req.files?.profileImage[0]?.path;
  // if (!profileImagePath) {
  //   // throw new apiError(400, "profile image path not provided");
  //   return res.status(400).json({
  //     error: {
  //       message: "Profile image path not provided",
  //     },
  //   });
  // }
  // const profileImage = await uploadOnCloudinary(profileImagePath);
  // if (!profileImage) {
  //   // throw new apiError(400, "profile image is required");
  //   return res.status(400).json({
  //     error: {
  //       message: "Profile image is required",
  //     },
  //   });
  // }

  const user = await User.create({
    username,
    email,
    password,
    isAdmin: isAdmin || false,
    profileImage
    // profileImage: profileImage.url,
  });

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    // throw new apiError(500, "Something went wrong while creating user");
    return res.status(400).json({
      error: {
        message: "Something went wrong while creating user",
      },
    });
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const {  email, password } = req.body;

  if (!email) {
    // throw new apiError(400, "email is required");
    return res.status(400).json({
      error: {
        message: "email is required",
      },
    });
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    // throw new apiError(404, "User does not exist");
    return res.status(404).json({
      error: {
        message: "user does not exist",
      },
    });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    // throw new apiError(401, "Invalid user credentials");
    return res.status(400).json({
      error: {
        message: "invalid user credentials",
      },
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  console.log('this is user request',req.user)
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = { httpOnly: true, secure: true, sameSite: "none" };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    // throw new apiError(401, "Unauthorized request");
    return res.status(401).json({
      error: {
        message: "Unauthorized request",
      },
    });
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );lo

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      // throw new apiError(401, "Invalid refresh token");
      return res.status(401).json({
        error: {
          message: "Invalid refresh token",
        },
      });
    }

    if (user.refreshToken !== incomingRefreshToken) {
      // throw new apiError(401, "refresh token is expired or used");
      return res.status(401).json({
        error: {
          message: "Refresh token is expired or used",
        },
      });
    }

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new apiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "new tokens generated"
        )
      );
  } catch (error) {
    // throw new apiError(401, error?.message || "Invalid refresh token");
    return res.status(401).json({
      error: {
        message:
          error.message ||
          "Invalid refresh token went wrong while generating access and refresh token",
      },
    });
  }
});

module.exports = { registerUser, loginUser, logoutUser, refreshAccessToken };
