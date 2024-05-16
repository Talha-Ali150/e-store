import React from "react";
import { Result } from "antd";
import { CartState } from "../context/Context";
import { UserState } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const { dispatch } = CartState();
  const {
    state: { user },
  } = UserState();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <Result
        status="success"
        title="Order Dispatched!"
        subTitle="Order number: 2017182818828182881 ready for shipping."
      />
      <button
        onClick={() => {
          dispatch({
            type: "CLEAR_CART",
          });
          navigate("/");
        }}
        className="text-white bg-gradient-to-r from-sky-500 to-purple-500 p-2 rounded-md inline-block"
      >
        continue browsing
      </button>
    </div>
  );
};
export default Checkout;
