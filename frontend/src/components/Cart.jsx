import React, { useEffect, useState } from "react";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Button, Drawer } from "antd";
import { CartState } from "../context/Context";
import { ImBin } from "react-icons/im";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { IoIosTrash } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate()
  const {
    state: { cart },
    dispatch,
  } = CartState();

  console.log("cart", cart);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [total, setTotal] = useState();
  const [subtotal, setSubTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, curr) => acc + Number(curr.discountedPrice) * curr.qty,
        0
      )
    );
    setSubTotal(cart.reduce((acc, curr) => acc + Number(curr.qty), 0));
  }, [cart]);

  return (
    <>
      <Button className="text-white" type="primary" onClick={showDrawer}>
        <div className="flex items-center">
          <PiShoppingCartSimple className="mx-2 text-2xl" />
          <p className="mx-2 ">{subtotal}</p>
        </div>
      </Button>
      <Drawer title="Cart" onClose={onClose} open={open}>
        <div>
          {cart.length > 0 ? (
            <>
              <p
                className="text-4xl mx-2 cursor-pointer"
                onClick={() => {
                  dispatch({
                    type: "CLEAR_CART",
                  });
                  console.log("clear cart fired");
                }}
              >
                <ImBin />
              </p>
              {cart.map((item) => {
                return (
                  <div
                    className="flex items-center justify-evenly my-6 mx-2"
                    key={item._id}
                  >
                    <p className="mx-2">{item.title}</p>
                    <img
                      alt="product thumbnail"
                      src={item.productMainImage}
                      className="w-[30px] h-[30px] mx-2"
                    />
                    <p
                      className="text-4xl mx-2 cursor-pointer"
                      onClick={() => {
                        dispatch({
                          type: "ADD_QTY",
                          payload: item,
                        });
                        console.log("add item fired");
                      }}
                    >
                      <IoIosAdd />
                    </p>
                    {item.qty > 0 && (
                      <p
                        className="text-4xl mx-2 cursor-pointer"
                        onClick={() => {
                          dispatch({
                            type: "REMOVE_QTY",
                            payload: item,
                          });
                          console.log("remove item fired");
                        }}
                      >
                        <IoIosRemove />
                      </p>
                    )}
                    <p
                      className="text-3xl mx-2 cursor-pointer"
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item,
                        });
                        console.log("remove from cart fired");
                      }}
                    >
                      <IoIosTrash />
                    </p>
                  </div>
                );
              })}
            </>
          ) : (
            <span>cart is empty</span>
          )}
          <p>subtotal: {subtotal}</p>
          <p>total: {
          total}</p>
          <button
            className="bg-sky-500 text-white p-2 rounded-md mt-3"
            onClick={() => {
              navigate('/checkout')
            }}
          >
            Checkout
          </button>
        </div>
      </Drawer>
    </>
  );
};
export default Cart;
