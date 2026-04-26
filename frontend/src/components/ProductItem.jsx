import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { resolveProductImage } from "../utils/resolveImage";

const ProductItem = ({ _id, image, name, price }) => {
  const { currency, backendUrl } = useContext(ShopContext);

  return (
    <Link 
      className="text-gray-700 cursor-pointer group" 
      to={`/product/${_id}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <div className="overflow-hidden rounded-lg bg-gray-100 aspect-square relative shadow-sm group-hover:shadow-md transition-shadow duration-300">
        <img
          className="group-hover:scale-105 transition duration-500 w-full h-full object-cover"
          src={resolveProductImage(Array.isArray(image) ? image[0] : image, backendUrl)}
          alt={name}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="pt-3 pb-1">
        <p className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-black transition-colors">{name}</p>
        <p className="text-sm font-bold text-gray-900 mt-1">
          {currency}{price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
