import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartReducer } from "./Reducers";
import axios from "axios";
const Cart = createContext();

const Context = ({ children }) => {
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

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });
  return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
};

export default Context;
export const CartState = () => {
  return useContext(Cart);
};
