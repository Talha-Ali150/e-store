const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/user.controller.js");
const upload = require("../middlewares/multer.middleware.js");

// router.route("/checking").post(registerUser);
router.route("/reg").post(
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
module.exports = router;
