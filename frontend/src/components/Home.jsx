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
      <div>
        {products.map((item) => {
          return <ProductCard item={item} />;
        })}
      </div>
    </div>
  );
};

export default Home;

// import React from 'react'
// import ProductCard from './ProductCard'

// const Home = () => {
//   const item = {
//     title:"JACKET",
//     img: require('../assets/images/jacket.png'),
//     original_price:'$ 433434',
//     discounted_price:"$ 200",    
//   }
//   return (
//     <div>
//       <ProductCard item={item} />
//     </div>
//   )
// }

// export default Home