import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { resolveProductImage } from "../utils/resolveImage";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl, loading } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setImage(found.image[0]);
    }
  }, [productId, products]);

  if (loading && !productData) {
    return <div className="py-20 text-center text-gray-500">Loading product...</div>;
  }

  if (!productData) {
    return <div className="py-20 text-center text-gray-500 border-t">Product not found.</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={resolveProductImage(item, backendUrl)}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border rounded object-cover aspect-square"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img 
              className="w-full h-auto rounded-lg shadow-sm" 
              src={resolveProductImage(image, backendUrl)} 
              alt={productData.name} 
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-bold text-3xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2 text-gray-500">(122 reviews)</p>
          </div>
          <p className="mt-5 text-3xl font-bold text-gray-900">
            {currency}{productData.price.toLocaleString()}
          </p>
          <p className="mt-5 text-gray-600 md:w-4/5 leading-relaxed">{productData.description}</p>
          
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-50 rounded-md hover:bg-gray-100 transition ${
                    item === size ? "border-black ring-1 ring-black" : "border-gray-300"
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-4 text-sm font-semibold active:bg-gray-800 rounded-lg transition-all w-full sm:w-auto"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5 border-gray-200" />
          
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-2">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              100% Original product.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Cash on delivery is available.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Easy 7-day return and exchange policy.
            </p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <button className="border-b-2 border-black px-5 py-3 text-sm font-bold">Description</button>
          <button className="text-gray-500 px-5 py-3 text-sm hover:text-black transition">Reviews (122)</button>
        </div>
        <div className="flex flex-col gap-4 border border-t-0 px-6 py-6 text-sm text-gray-600 leading-relaxed rounded-b-lg">
          <p>
            Experience ultimate comfort and style with our premium {productData.name.toLowerCase()}. 
            Crafted from high-quality materials, this piece is designed to provide a perfect fit 
            and long-lasting durability. Whether you're dressing up for a special occasion or 
            keeping it casual, this versatile addition to your wardrobe will keep you looking sharp.
          </p>
          <p>
            Our e-commerce platform ensures a seamless shopping experience with detailed 
            product insights, secure transactions, and reliable delivery services. 
            Join thousands of satisfied customers who trust UrbanCart for their fashion needs.
          </p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
