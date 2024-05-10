import React, { useState } from "react";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Button, Drawer } from "antd";
const Cart = ({ products }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button className="text-black" type="primary" onClick={showDrawer}>
        <div className="flex items-center">
          <PiShoppingCartSimple  className="mx-2 text-2xl"/>
          <p className="mx-2">{products.length}</p>
        </div>
      </Button>
      <Drawer title="Cart" onClose={onClose} open={open}>
        {products.map((item, index) => {
          return (
            <div className="flex items-center my-6 mx-2" key={index}>
              <p className="mx-2">{item.title}</p>
              <img
              alt="product thumbnail"
                src={item.productMainImage}
                className="w-[30px] h-[30px] mx-2"
              />
            </div>
          );
        })}
      </Drawer>
    </>
  );
};
export default Cart;
