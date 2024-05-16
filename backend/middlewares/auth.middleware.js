const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const verifyJWT = (requireAdmin = false ) => asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);

    if (!token) {
      // throw new apiError(401, "Unauthorized Request");
      return res.status(401).json({
        error: {
          message: "Unauthorized Request",
        },
      });
    }
    console.log("this is tokeeen:", token);

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      // throw new apiError(401, "Invalid access token");
      return res.status(401).json({
        error: {
          message: "Invalid access token",
        },
      });
    }

    req.user = user;

    if (requireAdmin  && !user.isAdmin) {
      // throw new apiError(403, "Access denied. You are not an admin.");
      return res.status(403).json({
        error: {
          message: "Access denied. You are not an admin.",
        },
      });
    }

    next();
  } catch (error) {
    // throw new apiError(401, error?.message || "Invalid access token");
    return res.status(401).json({
      error: {
        message: error.message || "Invalid access token",
      },
    });
  }
});

module.exports = verifyJWT;
