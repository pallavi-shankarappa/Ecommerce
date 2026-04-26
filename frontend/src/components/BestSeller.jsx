import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext); // get products from context
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    // Take first 5 products as bestsellers
    setBestSellerProducts(products.slice(0, 5));
    
    // If your products have a "bestseller" flag, you could do:
    // setBestSellerProducts(products.filter(p => p.bestseller).slice(0,5));
  }, [products]);

  return (
    <div className="my-10">
      {/* Section Title */}
      <div className="text-center py-8 text-3xl">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Check out our top-selling products loved by our customers.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-8">
        {bestSellerProducts.map((item, index) => (
          <ProductItem 
            key={index} 
            _id={item._id} 
            image={item.image} 
            name={item.name} 
            price={item.price} 
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;

