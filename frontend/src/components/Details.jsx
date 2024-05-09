import React from "react";
import { useLocation } from "react-router-dom";

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
    // size,
  } = item;
  console.log(item);
  return (
    <div className="flex items-start w-[80vw] mx-auto">
      <div>
        <img alt="product view" className="w-[350px] h-[450px] m-5 " src={productMainImage} />
      </div>
      <div className="mt-5 pt-3 px-5">
        <p className="font-bold text-5xl mt-4">{title}</p>
        <p className="font-bold text-lg mt-4">{description}</p>
        <p className="italic font-bold">${discountedPrice}</p>
        <p className="italic font-bold line-through">${originalPrice}</p>
        {/* <p className="font-bold">{size}</p> */}
        {/* {productSecondaryImages?.map((item, index) => {
          return <img key={index} className="w-10 h-10" src={item} />;
        })} */}
      </div>
    </div>
  );
};

export default Details;
