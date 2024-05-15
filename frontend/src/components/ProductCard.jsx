import React from "react";
import { useNavigate } from "react-router-dom";
// import { CartState } from "../context/Context";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  // const {
  //   // state: { products, cart },
  //   // dispatch,
  // } = CartState();
  return (
    <div
      className="productCardMainContainer w-[350px] bg-red-700 mx-6 my-10"
      onClick={() => navigate(`/detail-page/${item?._id}`, { state: { item } })}
      // onClick={() => {
      //   dispatch({
      //     type: "ADD_TO_CART",
      //     payload: item,
      //   });
      // }}
    >
      <div
        className={` productCardSection1    w-[350px] h-[175px] flex flex-col items-center ${
          item?.category === "Women"
            ? "bg-customPink"
            : item.category === "Kids"
            ? "bg-customMint"
            : "bg-sky-500"
        }`}
      >
        <p className="text-white font-bold text-xl my-3">{item.title}</p>
        <img
          className="h-[225px] w-[225px]"
          alt="clothes"
          src={item.productMainImage}
        />
        <button
          className={`px-5 py-3 -mt-32 rounded-full w-[200px] text-white text-xl font-bold shadow-lg  ${
            item?.category === "Women"
              ? "bg-customPink"
              : item.category === "Kids"
              ? "bg-customMint"
              : "bg-sky-500"
          }`}
        >
          SHOP NOW
        </button>
      </div>
      <div className="productCardSection2 w-[350px] h-[150px]  bg-gray-300 flex flex-col items-center justify-end shadow-lg  shadow-gray-400">
        <p className="text-sm font-bold drop-shadow-lg">
          $ {item.discountedPrice}
        </p>
        <p className="text-sm font-bold drop-shadow-lg line-through">
          $ {item.originalPrice}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
