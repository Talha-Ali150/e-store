const express = require("express");
const router = express.Router();

const {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getMyProducts,
} = require("../controllers/product.controller.js");

const upload = require("../middlewares/multer.middleware.js");
const verifyJWT = require("../middlewares/auth.middleware.js");

router.route("/get-products").get(getProducts);

//this is a protected route
router.route("/add-product").post(
  // upload.fields([
  //   {
  //     name: "productMainImage",
  //     maxCount: 1,
  //   },
  // {
  //   name: "productSecondaryImages",
  //   maxCount: 3,
  // },
  // ]),
  verifyJWT(true),
  addProduct
);

router.route("/delete-product").delete(verifyJWT(), deleteProduct);
router.route("/update-product/:id").put(verifyJWT(true), updateProduct);
router.route("/get-myproducts").get(verifyJWT(), getMyProducts);

//protected routes
module.exports = router;
