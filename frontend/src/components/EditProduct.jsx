import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

const EditProduct = () => {
  const [initialProduct, setInitialProduct] = useState(null);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    category: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchSingleProduct = async () => {
    try {
      const response = await axios.get(
        "https://e-store-taupe.vercel.app/api/products/get-single-product",
        { params: { id }, withCredentials: true }
      );
      const { data } = response.data;
      setProduct(data[0]);
      setInitialProduct(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const handleCategoryChange = (e) => {
    setProduct({ ...product, category: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!product.title) {
      errors.title = "Please enter title";
    }
    if (!product.description) {
      errors.description = "Please enter description";
    }
    if (!product.originalPrice) {
      errors.originalPrice = "Please enter original price";
    }
    if (!product.discountedPrice) {
      errors.discountedPrice = "Please enter discounted price";
    }
    if (!product.category) {
      errors.category = "Please choose category";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getUpdatedFields = () => {
    const updatedFields = {};
    for (const key in product) {
      if (product[key] !== initialProduct[key]) {
        updatedFields[key] = product[key];
      }
    }
    return updatedFields;
  };

  const submitEditProductForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedFields = getUpdatedFields();
    if (Object.keys(updatedFields).length === 0) {
      setError("No changes made to the product");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `https://e-store-taupe.vercel.app/api/products/update-product`,
        updatedFields,
        { params: { id }, withCredentials: true }
      );
      console.log("Product updated successfully:", response.data);
      setError("");
      navigate("/my-products");
    } catch (error) {
      console.log(error?.response?.data?.error?.message);
      setError(error?.response?.data?.error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-500 to-purple-500 flex items-center justify-center h-screen w-full">
      <form className="w-[90%] bg-white flex flex-col items-center p-8 rounded-lg sm:w-1/3">
        <span className="flex flex-row items-center mb-4 w-full">
          <input
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <span className="text-red-500">{formErrors.title}</span>

        <span className="flex flex-row items-center mb-4 w-full">
          <input
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <span className="text-red-500">{formErrors.description}</span>

        <span className="flex flex-row items-center mb-4 w-full">
          <input
            name="originalPrice"
            value={product.originalPrice}
            onChange={handleChange}
            placeholder="Original Price"
            type="number"
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <span className="text-red-500">{formErrors.originalPrice}</span>

        <span className="flex flex-row items-center mb-4 w-full">
          <input
            name="discountedPrice"
            value={product.discountedPrice}
            onChange={handleChange}
            placeholder="Discounted Price"
            type="number"
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <span className="text-red-500">{formErrors.discountedPrice}</span>

        <span className="flex flex-row items-center mb-4 w-full">
          <label htmlFor="category" className="mr-2">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={product.category}
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

        <span className="text-red-500">{error}</span>
        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={submitEditProductForm}
            className="bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
          >
            Update Product
          </button>
        )}
      </form>
    </div>
  );
};

export default EditProduct;
