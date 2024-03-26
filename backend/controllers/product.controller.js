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
    // throw new apiError(400, "All fields are required");
    res.status(400).json({
      error: {
        message: "All fields are required",
      },
    });
  }

  const productImagePath = req.files?.productImage[0]?.path;

  if (!productImagePath) {
    // throw new apiError(400, "product image path not provided");
    res.status(400).json({
      error: {
        message: "Product image path not provided",
      },
    });
  }

  const productImage = await uploadOnCloudinary(productImagePath);

  if (!productImage) {
    // throw new apiError(400, "product image is required");
    res.status(400).json({
      error: {
        message: "Product image is required",
      },
    });
  }

  const newProduct = await Product.create({
    ...req.body,
    productImage: productImage.url,
  });

  const newAddedProduct = await Product.findById(newProduct._id);
  if (!newAddedProduct) {
    // throw new apiError(500, "Something went wrong while adding product");
    res.status(500).json({
      error: {
        message: "Something went wrong while adding product",
      },
    });
  }

  return res
    .status(201)
    .json(new apiResponse(200, newAddedProduct, "Product added successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    // throw new apiError(404, `No product with the id of ${id}`);
    res.status(404).json({
      error: {
        message: "No product found",
      },
    });
  }

  return res
    .status(200)
    .json(new apiResponse(200, null, "The product has been deleted"));
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    // return new apiError(404, "no products found");
    res.status(404).json({
      error: {
        message: "No products found",
      },
    });
  }
  res
    .status(200)
    .json(new apiResponse(200, products, "All products fetched successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let productToUpdate = await Product.findById(id);

  if (!productToUpdate) {
    // throw new apiError(404, `No product with the id of ${id}`);
    res.status(400).json({
      error: {
        message: "No product found",
      },
    });
  }

  const { title, description, originalPrice, discountedPrice, size } = req.body;

  const fieldsToUpdate = {
    title,
    description,
    originalPrice,
    discountedPrice,
    size,
  };

  Object.keys(fieldsToUpdate).forEach((field) => {
    if (fieldsToUpdate[field]) {
      productToUpdate[field] = fieldsToUpdate[field];
    }
  });

  const productImagePath = req.files?.productImage[0]?.path;
  if (productImagePath) {
    const productImage = await uploadOnCloudinary(productImagePath);
    if (!productImage) {
      // throw new apiError(400, "Product image is required");
      res.status(400).json({
        error: {
          message: "Product image is required",
        },
      });
    }
    productToUpdate.productImage = productImage.url;
  }

  productToUpdate = await productToUpdate.save();

  res
    .status(200)
    .json(
      new apiResponse(200, productToUpdate, "Product updated successfully")
    );
});

module.exports = {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
};
