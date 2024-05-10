import React, { useEffect, useState } from "react";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Button, Drawer } from "antd";
import { CartState } from "../context/Context";
const Cart = () => {
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
      <Button className="text-black" type="primary" onClick={showDrawer}>
        <div className="flex items-center">
          <PiShoppingCartSimple className="mx-2 text-2xl" />
          <p className="mx-2">{subtotal}</p>
        </div>
      </Button>
      <Drawer title="Cart" onClose={onClose} open={open}>
        <div>
          {cart.length > 0 ? (
            <>
              {cart.map((item) => {
                return (
                  <div className="flex items-center my-6 mx-2" key={item._id}>
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
                      +
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
                        -
                      </p>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <span>cart is empty</span>
          )}
          <p>subtotal: {subtotal}</p>
          <p>total: {total}</p>
        </div>
      </Drawer>
    </>
  );
};
export default Cart;


// import React, { useEffect, useState } from "react";
// import { CartState } from "../context/Context";

// const Cart = () => {
//   const {
//     state: { cart },
//     dispatch,
//   } = CartState();
//   console.log("cart", cart);

//   const [total, setTotal] = useState();
//   const [subtotal, setSubTotal] = useState();
//   useEffect(() => {
//     setTotal(
//       cart.reduce((acc, curr) => acc + Number(curr.discountedPrice) * curr.qty, 0)
//     );
//     setSubTotal(cart.reduce((acc, curr) => acc + Number(curr.qty), 0));
//   }, [cart]);

//   return (
//     <div>
//       {cart.length > 0 ? (
//         <>
//           {cart.map((item) => {
//             return (
//               <div
//                 key={item._id}
//                 style={{
//                   width: 300,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   margin: 10,
//                   backgroundColor: "yellowgreen",
//                 }}
//               >
//                 <img
//                   style={{ width: 200, height: 200 }}
//                   src={item.productMainImage}
//                   alt="thumbnail"
//                 />
//                 <p>{item.title}</p>
//                 <p>{item.discountedPrice}$ </p>
//                 {/* <p>{item.rating.rate}</p> */}
//                 {item.qty > 0 && (
//                   <button
//                     style={{ padding: 3 }}
//                     onClick={() => {
//                       dispatch({
//                         type: "REMOVE_QTY",
//                         payload: item,
//                       });
//                     }}
//                   >
//                     REMOVE QTY
//                   </button>
//                 )}
//                 <button
//                   style={{ padding: 3 }}
//                   onClick={() => {
//                     dispatch({
//                       type: "ADD_QTY",
//                       payload: item,
//                     });
//                   }}
//                 >
//                   ADD QTY
//                 </button>
//                 <button
//                   style={{ padding: 3 }}
//                   onClick={() => {
//                     dispatch({
//                       type: "REMOVE_FROM_CART",
//                       payload: item,
//                     });
//                   }}
//                 >
//                   Remove from Cart
//                 </button>
//               </div>
//             );
//           })}
//         </>
//       ) : (
//         <span>cart is empty</span>
//       )}
//       <p>subtotal: {subtotal}</p>
//       <p>total: {total}</p>
//     </div>
//   );
// };

// export default Cart;
