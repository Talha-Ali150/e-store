const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller.js");

const upload = require("../middlewares/multer.middleware.js");
const verifyJWT = require("../middlewares/auth.middleware.js");

// router.route("/checking").post(registerUser);
router.route("/register").post(
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//protected routes
router.route("/logout").post(verifyJWT, logoutUser);
module.exports = router;
