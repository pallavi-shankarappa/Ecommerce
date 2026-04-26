import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products];

      // Filter by category
      if (category) {
        productsCopy = productsCopy.filter(
          (item) => item.category === category
        );
      }

      // Filter by subCategory
      if (subCategory) {
        productsCopy = productsCopy.filter(
          (item) => item.subCategory === subCategory
        );
      }

      // Take first 5 related items
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      {/* Title */}
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      {/* Related Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            _id={item._id}                // ✅ fixed from id → _id
            name={item.name}
            price={item.price}
            image={Array.isArray(item.image) ? item.image[0] : item.image} // ✅ safe for array or string
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
