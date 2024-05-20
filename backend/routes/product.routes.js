const express = require("express");
const router = express.Router();

const {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
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

router.route("/delete-product/:id").delete(verifyJWT(true), deleteProduct);
router.route("/update-product/:id").put(verifyJWT(true), updateProduct);

//protected routes
module.exports = router;
