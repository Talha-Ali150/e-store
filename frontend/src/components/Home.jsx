import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AddProductForm from "./AddProduct";
import axios from "axios";
import ProductCard from "./ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/get-products"
      );
      console.log(response.data.data);
      setProducts(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div class="bg-pink-100">...</div>
      <div class="bg-blue-500">...</div>
      <div class="bg-yellow-300">...</div>
      <div>
        {products.map((item) => {
          return <ProductCard product={item} />;
        })}
      </div>
    </div>
  );
};

export default Home;
