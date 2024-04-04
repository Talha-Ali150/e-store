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


import React from 'react'

const ProductCard = () => {
  return (
    <div>ProductCard</div>
  )
}

export default ProductCard