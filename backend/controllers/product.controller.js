//crud operations on product
//first i will try to add product

const Product = require("../models/product.models");
// const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const uploadOnCloudinary = require("../utils/cloudinary");

const addProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    originalPrice,
    discountedPrice,
    productMainImage,
    // size,
    category,
  } = req.body;
  const owner = req.user._id;
  console.log("this is body request body", req.body);
  console.log("owner id", owner);
  if (
    [
      title,
      description,
      originalPrice,
      discountedPrice,
      // size,
      productMainImage,
      category,
    ].some((field) => field.trim() === "")
  ) {
    // throw new apiError(400, "All fields are required");
    return res.status(400).json({
      error: {
        message: "All fields are required",
      },
    });
  }

  // const productMainImagePath = req.files?.productMainImage[0]?.path;
  // const productSecondaryImagePaths = req.files?.productSecondaryImages?.map(
  //   (file) => file.path
  // );

  // if (!productMainImagePath) {
  // throw new apiError(400, "product image path not provided");
  // return res.status(400).json({
  //     error: {
  //       message: "Product image path not provided",
  //     },
  //   });
  // }
  // if (!productSecondaryImagePaths) {
  //   // throw new apiError(400, "product secondary images path not provided");
  //   return res.status(400).json({
  //     error: {
  //       message: "Product secondary images path not provided",
  //     },
  //   });
  // }

  // const productMainImage = await uploadOnCloudinary(productMainImagePath);
  // const productSecondaryImages = await productSecondaryImagePaths(

  // const productSecondaryImages = [];
  // for (const imagePath of productSecondaryImagePaths) {
  //   const uploadedImage = await uploadOnCloudinary(imagePath);
  //   if (uploadedImage) {
  //     productSecondaryImages.push(uploadedImage.secure_url);
  //   }
  // }

  // if (!productMainImage) {
  //   // throw new apiError(400, "product image is required");
  //   return res.status(400).json({
  //     error: {
  //       message: "Product image is required",
  //     },
  //   });
  // }

  const newProduct = await Product.create({
    title,
    description,
    originalPrice,
    discountedPrice,
    // size,
    productMainImage,
    category,
    owner,
    // productMainImage: productMainImage.url,
    // productSecondaryImages: productSecondaryImages,
  });

  const newAddedProduct = await Product.findById(newProduct._id);
  if (!newAddedProduct) {
    // throw new apiError(500, "Something went wrong while adding product");
    return res.status(500).json({
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
  const id = req.user._id.toString();
  const { del_id, owner_id } = req.query;

  console.log("user id", id);
  console.log("del id", del_id);
  console.log("owner id", owner_id);

  if (id !== owner_id) {
    return res.status(401).json({
      error: {
        message: "Only owner  can delete product",
      },
    });
  }
  const deletedProduct = await Product.findByIdAndDelete(del_id);

  if (!deletedProduct) {
    // throw new apiError(404, `No product with the id of ${id}`);
    return res.status(404).json({
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
    return res.status(404).json({
      error: {
        message: "No products found",
      },
    });
  }
  return res
    .status(200)
    .json(new apiResponse(200, products, "All products fetched successfully"));
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const {id} = req.query
  const product = await Product.find({_id:id});
  if (!product) {
    return res.status(404).json({
      error: {
        message: "No product found",
      },
    });
  }
  return res
    .status(200)
    .json(new apiResponse(200, product, "product fetched successfully"));
});

const getMyProducts = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  console.log("this si owner id", ownerId);

  if (!ownerId) {
    return res.status(400).json({
      error: {
        message: "Owner ID is missing",
      },
    });
  }

  const products = await Product.find({ owner: ownerId });

  if (!products || products.length === 0) {
    return res.status(404).json({
      error: {
        message: "No products found",
      },
    });
  }

  return res
    .status(200)
    .json(new apiResponse(200, products, "All products fetched successfully"));
});

//   const products = await Product.find({});
//   if (!products) {
//     // return new apiError(404, "no products found");
//     return res.status(404).json({
//       error: {
//         message: "No products found",
//       },
//     });
//   }
//   return res
//     .status(200)
//     .json(new apiResponse(200, products, "All products fetched successfully"));
// });

// const updateProduct = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   let productToUpdate = await Product.findById(id);

//   if (!productToUpdate) {
//     // throw new apiError(404, `No product with the id of ${id}`);
//     return res.status(400).json({
//       error: {
//         message: "No product found",
//       },
//     });
//   }

//   const {
//     title,
//     description,
//     originalPrice,
//     discountedPrice,
//     //  size
//   } = req.body;

//   const fieldsToUpdate = {
//     title,
//     description,
//     originalPrice,
//     discountedPrice,
//     // size,
//   };

//   Object.keys(fieldsToUpdate).forEach((field) => {
//     if (fieldsToUpdate[field]) {
//       productToUpdate[field] = fieldsToUpdate[field];
//     }
//   });

//   const productImagePath = req.files?.productImage[0]?.path;
//   if (productImagePath) {
//     const productImage = await uploadOnCloudinary(productImagePath);
//     if (!productImage) {
//       // throw new apiError(400, "Product image is required");
//       return res.status(400).json({
//         error: {
//           message: "Product image is required",
//         },
//       });
//     }
//     productToUpdate.productImage = productImage.url;
//   }

//   productToUpdate = await productToUpdate.save();

//   return res
//     .status(200)
//     .json(
//       new apiResponse(200, productToUpdate, "Product updated successfully")
//     );
// });

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const ownerId = req.user._id.toString();
  const {
    title,
    description,
    originalPrice,
    discountedPrice,
    productMainImage,
    category,
  } = req.body;

  console.log("Product ID to update:", id);
  console.log("Owner ID:", ownerId);
  console.log("Request body:", req.body);

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      error: {
        message: "Product not found",
      },
    });
  }

  if (product.owner.toString() !== ownerId) {
    return res.status(401).json({
      error: {
        message: "Only the owner can update this product",
      },
    });
  }

  if (
    [
      title,
      description,
      originalPrice,
      discountedPrice,
      productMainImage,
      category,
    ].some((field) => field && field.trim() === "")
  ) {
    return res.status(400).json({
      error: {
        message: "All fields must be non-empty",
      },
    });
  }

  const updatedFields = {
    title,
    description,
    originalPrice,
    discountedPrice,
    productMainImage,
    category,
  };
  Object.keys(updatedFields).forEach((key) => {
    if (updatedFields[key]) {
      product[key] = updatedFields[key];
    }
  });

  await product.save();

  return res
    .status(200)
    .json(new apiResponse(200, product, "Product updated successfully"));
});

module.exports = {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getMyProducts,
  getSingleProduct
};
