import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  // useState,
} from "react";
import { cartReducer } from "./Reducers";
import axios from "axios";
const Cart = createContext();

const initialState = () => {
  const savedCart = localStorage.getItem("cart");
  return {
    products: [],
    cart: savedCart ? JSON.parse(savedCart) : [],
  };
};

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {}, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/get-products"
        );
        dispatch({ type: "SET_PRODUCTS", payload: response.data.data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
};

export default Context;
export const CartState = () => {
  return useContext(Cart);
};
