const express = require("express");
const router = express.Router();

const { addProduct } = require("../controllers/product.controller.js");

const upload = require("../middlewares/multer.middleware.js");
const verifyJWT = require("../middlewares/auth.middleware.js");

//this is a protected route
router.route("/add-product").post(
  upload.fields([
    {
      name: "productImage",
      maxCount: 1,
    },
  ]),
  verifyJWT,
  addProduct
);

//protected routes
module.exports = router;
