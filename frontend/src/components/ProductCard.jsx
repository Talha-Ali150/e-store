// import axios from "axios";
// import React from "react";
// import { MdDeleteOutline } from "react-icons/md";

// const ProductCard = ({ product }) => {
//   // const isDelete = false;
//   const submitDelete = async (e) => {
//     e.preventDefault();

//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this product?"
//     );

//     if (!confirmDelete) {
//       return null;
//     }

//     try {
//       const isDeleted = await axios.delete(
//         `http://localhost:5000/api/products/delete-product/${product._id}`,
//         {
//           withCredentials: true,
//         }
//       );
//       if (isDeleted) {
//         window.location.reload();
//       }
//     } catch (error) {
//       console.log(error?.response?.data?.error?.message);
//     }
//   };
//   return (
//     <div className="max-w-sm rounded overflow-hidden shadow-lg">
//       {/* Main product image */}
//       <img
//         src={product.productMainImage}
//         alt={product.title}
//         className="w-full h-64 object-cover"
//       />

//       <div className="px-6 py-4">
//         {/* Product title */}
//         <div className="font-bold text-xl mb-2">{product.title}</div>

//         {/* Product description */}
//         <p className="text-gray-700 text-base">{product.description}</p>
//       </div>

//       <div className="px-6 pt-4 pb-2">
//         {/* Product prices */}
//         <p className="text-gray-700 text-base">
//           Original Price: ${product.originalPrice}
//         </p>
//         <p className="text-gray-700 text-base">
//           Discounted Price: ${product.discountedPrice}
//         </p>
//       </div>

//       <div className="px-6 pt-4 pb-2">
//         {/* Product size */}
//         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
//           {product.size}
//         </span>
//       </div>

//       {/* Secondary product images */}
//       <div className="flex justify-center items-center">
//         {product.productSecondaryImages.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={product.title}
//             className="w-16 h-16 object-cover rounded-full border-2 border-gray-200 mr-2"
//           />
//         ))}
//       </div>
//       <div className=" text-4xl">
//         <MdDeleteOutline
//           onClick={(e) => {
//             submitDelete(e);
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
// EF3054

const ProductCard = ({ item }) => {
  return (
    <div className="productCardMainContainer">
      <div
        className={` productCardSection1    w-[350px] h-[175px] flex flex-col items-center ${
          item?.category == "Women"
            ? "bg-customPink"
            : item.category == "Kids"
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
            item?.category == "Women"
              ? "bg-customPink"
              : item.category == "Kids"
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
