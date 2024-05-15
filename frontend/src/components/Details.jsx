import React from "react";
import { useLocation } from "react-router-dom";
import { CartState } from "../context/Context";

const Details = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const {
    title,
    description,
    productMainImage,
    // productSecondaryImages,
    originalPrice,
    discountedPrice,
    category,
    // size,
    _id,
  } = item;
  const {
    state: { cart },
    dispatch,
  } = CartState();
  console.log(item);

  const itemExists = cart.filter((c) => c._id === _id);

  return (
    <div className="flex items-start w-[80vw] mx-auto">
      <div>
        <img
          alt="product view"
          className="w-[350px] h-[450px] m-5 "
          src={productMainImage}
        />
      </div>
      <div className="mt-5 pt-3 px-5">
        <p className="font-bold text-5xl mt-4">{title}</p>
        <p className="font-bold text-lg mt-4">{description}</p>
        <p className="italic font-bold">${discountedPrice}</p>
        <p className="italic font-bold line-through">${originalPrice}</p>
        <div>
          <p
            className={`text-white py-1 px-2 my-2 rounded-lg inline-block  ${
              item?.category === "Women"
                ? "bg-customPink"
                : item.category === "Kids"
                ? "bg-customMint"
                : "bg-sky-500"
            }`}
          >
            {category}
          </p>
        </div>
        <div>
          {itemExists.length>0 ? (
            <button
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: item,
                });
              }}
              className="text-white bg-gradient-to-r from-red-800 to-customPink p-2 rounded-md inline-block my-2"
            >
              remove from cart
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: item,
                });
              }}
              className="text-white bg-gradient-to-r from-sky-500 to-purple-500 p-2 rounded-md inline-block"
            >
              add to cart
            </button>
          )}
        </div>
        <div></div>
        <p>{_id}</p>
        {/* <p className="font-bold">{size}</p> */}
        {/* {productSecondaryImages?.map((item, index) => {
          return <img key={index} className="w-10 h-10" src={item} />;
        })} */}
      </div>
    </div>
  );
};

export default Details;
