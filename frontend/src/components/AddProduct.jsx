import React, { useState } from "react";
import axios from "axios";
import { CiFileOn } from "react-icons/ci";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [productMainImage, setProductMainImage] = useState("");
  // const [productSecondaryImages, setProductSecondaryImages] = useState([]);
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  // const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductMainImage(file);
  };

  // const handleSecondaryImages = (e) => {
  //   const files = Array.from(e.target.files);
  //   setProductSecondaryImages(files);
  // };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const validateForm = () => {
    const errors = {};
    if (!title) {
      errors.title = "Please enter title";
    }
    if (!description) {
      errors.description = "Please enter description";
    }
    if (!productMainImage) {
      errors.productMainImage = "Please choose main image";
    }
    if (!originalPrice) {
      errors.originalPrice = "Please enter original price";
    }
    if (!discountedPrice) {
      errors.discountedPrice = "Please enter discounted price";
    }
    // if (!size) {
    //   errors.size = "Please enter size";
    // }
    if (!category) {
      errors.category = "Please choose category";
    }
    // if (productSecondaryImages.length > 3) {
    //   errors.numberOfPics = "Upto 3 pictures are allowed for each product";
    // }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "mern-notes");
    data.append("cloud_name", "mern-notes");

    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/mern-notes/image/upload",
        data
      );
      setLoading(false);
      return response.data.url;
    } catch (e) {
      console.log("Cloudinary error:", e);
      setLoading(false);
      return null;
    }
  };

  const submitAddProductForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const productMainImageUrl = await uploadImageToCloudinary(
        productMainImage
      );
      if (!productMainImageUrl) {
        setError("Failed to upload product image");
        setLoading(false);
        return;
      }

      // const formData = new FormData();
      // formData.append("title", title);
      // formData.append("description", description);
      // formData.append("productMainImage", productMainImageUrl);
      // // productSecondaryImages.forEach((image) =>
      // //   formData.append("productSecondaryImages", image)
      // // );
      // formData.append("originalPrice", originalPrice);
      // formData.append("discountedPrice", discountedPrice);
      // // formData.append("size", size);
      // formData.append("category", category);

      const response = await axios.post(
        "https://e-store-taupe.vercel.app/api/products/add-product",
        {
          title,
          description,
          originalPrice,
          discountedPrice,
          // size,
          productMainImage: productMainImageUrl,
          category,
        },
        {
          // headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log("Product added successfully:", response.data);
      setError("");
      setTitle("");
      setDescription("");
      setProductMainImage("");
      // setProductSecondaryImages([]);
      setOriginalPrice("");
      setDiscountedPrice("");
      // setSize("");
      setCategory("");
      navigate("/");
    } catch (error) {
      // console.log("Error adding product:", error);
      // setError("Error adding product. Please try again later.");
      console.log(error?.response?.data?.error?.message);
      setError(error?.response?.data?.error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class=" bg-gradient-to-r from-sky-500 to-purple-500 flex items-center justify-center h-screen  w-[100%]">
      <form className="w-[90%] bg-white  flex flex-col items-center p-8 rounded-lg sm:w-1/3">
        <span className="flex flex-row items-center mb-4 w-full">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <span className="text-red-500">{formErrors.title}</span>

        <span className="flex flex-row items-center mb-4 w-full">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <span className="text-red-500">{formErrors.description}</span>

        <span className="flex flex-row items-center mb-4 w-full">
          <input
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Original Price"
            type="number"
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <span className="text-red-500">{formErrors.originalPrice}</span>

        <span className="flex flex-row items-center mb-4 w-full">
          <input
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
            placeholder="Discounted Price"
            type="number"
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <span className="text-red-500">{formErrors.discountedPrice}</span>

        {/* <div className="flex flex-row items-center mb-4 w-full">
          <label className="mr-2">Size:</label>
          <label className="mr-2">
            <input
              type="radio"
              value="S"
              checked={size === "S"}
              onChange={(e) => setSize(e.target.value)}
              className="mr-1"
            />
            S
          </label>
          <label className="mr-2">
            <input
              type="radio"
              value="M"
              checked={size === "M"}
              onChange={(e) => setSize(e.target.value)}
              className="mr-1"
            />
            M
          </label>
          <label>
            <input
              type="radio"
              value="L"
              checked={size === "L"}
              onChange={(e) => setSize(e.target.value)}
              className="mr-1"
            />
            L
          </label>
        </div>
        <span className="text-red-500">{formErrors.size}</span> */}

        <span className="flex flex-row items-center mb-4 w-full">
          <label htmlFor="category" className="mr-2">
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </span>
        <span className="text-red-500">{formErrors.category}</span>

        <label>Product Main Image</label>
        <span className="flex flex-row items-center mb-4 w-full">
          <CiFileOn />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>

        <span className="text-red-500">{formErrors.productMainImage}</span>

        {/* <label>Product Other Images</label>
        <span className="flex flex-row items-center mb-4 w-full">
          <CiFileOn />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleSecondaryImages}
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span> */}

        {/* <span className="text-red-500">
          {formErrors.productSecondaryImages}
        </span> */}
        {/* <span className="text-red-500">{formErrors.numberOfPics}</span> */}

        <span className="text-red-500">{error}</span>
        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={submitAddProductForm}
            className="bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
          >
            Add Product
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProductForm;
