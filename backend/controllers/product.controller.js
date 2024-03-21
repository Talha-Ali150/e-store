//crud operations on product
//first i will try to add product

const Product = require("../models/product.models");
const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const uploadOnCloudinary = require("../utils/cloudinary");

const addProduct = asyncHandler(async (req, res) => {
  const { title, description, originalPrice, discountedPrice, size } = req.body;

  if (
    [title, description, originalPrice, discountedPrice, size].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new apiError(400, "All fields are required");
  }

  const productImagePath = req.files?.productImage[0]?.path;

  if (!productImagePath) {
    throw new apiError(400, "product image path not provided");
  }

  const productImage = await uploadOnCloudinary(productImagePath);

  if (!productImage) {
    throw new apiError(400, "product image is required");
  }

  const newProduct = await Product.create({
    ...req.body,
    productImage: productImage.url,
  });

  const newAddedProduct = await Product.findById(newProduct._id);
  if (!newAddedProduct) {
    throw new apiError(500, "Something went wrong while adding product");
  }

  return res
    .status(201)
    .json(new apiResponse(200, newAddedProduct, "Product added successfully"));
});

module.exports = {
  addProduct,
};
