import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { resolveProductImage } from "../utils/resolveImage";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, backendUrl } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="mt-8">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20 rounded-lg shadow-sm aspect-square object-cover"
                  src={resolveProductImage(productData.image[0], backendUrl)}
                  alt={productData.name}
                />
                <div>
                  <p className="text-sm sm:text-lg font-bold text-black">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="font-medium">
                      {currency}{productData.price.toLocaleString()}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-gray-50 rounded text-xs">
                      Size: {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 rounded text-center focus:outline-none focus:ring-1 focus:ring-black"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer hover:scale-110 transition opacity-60 hover:opacity-100"
                src={assets.bin_icon}
                alt="Remove"
              />
            </div>
          );
        })}
      </div>

      {cartData.length > 0 ? (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black text-white text-sm my-8 px-8 py-4 rounded-lg font-bold active:bg-gray-800 transition shadow-lg w-full sm:w-auto"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-gray-400 text-xl mb-8">Your shopping cart is empty.</p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white px-10 py-4 rounded-lg font-bold hover:bg-gray-800 transition"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
