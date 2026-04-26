import React from "react";
import { assets } from "../assets/assets"; // make sure you have exchange_icon, return_icon, support_icon

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 bg-gray-50/50 rounded-2xl my-20">
      <div className="flex flex-col items-center">
        <img src={assets.exchange_icon} className="w-12 mb-5 hover:scale-110 transition duration-300" alt="" />
        <p className="font-bold text-gray-900">Easy Exchange Policy</p>
        <p className="text-gray-400 mt-1">We offer hassle-free exchange policy</p>
      </div>
      <div className="flex flex-col items-center">
        <img src={assets.quality_icon} className="w-12 mb-5 hover:scale-110 transition duration-300" alt="" />
        <p className="font-bold text-gray-900">7 Days Return Policy</p>
        <p className="text-gray-400 mt-1">We provide 7 days free return policy</p>
      </div>
      <div className="flex flex-col items-center">
        <img src={assets.support_img} className="w-12 mb-5 hover:scale-110 transition duration-300" alt="" />
        <p className="font-bold text-gray-900">Best Customer Support</p>
        <p className="text-gray-400 mt-1">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
