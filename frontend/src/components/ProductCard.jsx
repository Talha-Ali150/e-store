import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {/* Main product image */}
      <img
        src={product.productMainImage}
        alt={product.title}
        className="w-full h-64 object-cover"
      />

      <div className="px-6 py-4">
        {/* Product title */}
        <div className="font-bold text-xl mb-2">{product.title}</div>

        {/* Product description */}
        <p className="text-gray-700 text-base">{product.description}</p>
      </div>

      <div className="px-6 pt-4 pb-2">
        {/* Product prices */}
        <p className="text-gray-700 text-base">
          Original Price: ${product.originalPrice}
        </p>
        <p className="text-gray-700 text-base">
          Discounted Price: ${product.discountedPrice}
        </p>
      </div>

      <div className="px-6 pt-4 pb-2">
        {/* Product size */}
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {product.size}
        </span>
      </div>

      {/* Secondary product images */}
      <div className="flex justify-center items-center">
        {product.productSecondaryImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={product.title}
            className="w-16 h-16 object-cover rounded-full border-2 border-gray-200 mr-2"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
