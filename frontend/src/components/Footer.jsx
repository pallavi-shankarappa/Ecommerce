import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="pt-20 pb-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="UrbanCart Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
            Experience the best in modern e-commerce. UrbanCart provides high-quality products, 
            secure payments, and exceptional customer service. Join our community and discover 
            the latest trends in fashion and lifestyle.
          </p>
        </div>

        <div>
          <p className="text-xl font-bold mb-5 uppercase tracking-wider">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black cursor-pointer transition-colors">Home</li>
            <li className="hover:text-black cursor-pointer transition-colors">About us</li>
            <li className="hover:text-black cursor-pointer transition-colors">Delivery</li>
            <li className="hover:text-black cursor-pointer transition-colors">Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-bold mb-5 uppercase tracking-wider">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black cursor-pointer transition-colors">+91-98765-43210</li>
            <li className="hover:text-black cursor-pointer transition-colors">support@urbancart.com</li>
            <li className="hover:text-black cursor-pointer transition-colors">Instagram</li>
          </ul>
        </div>
      </div>

      <div>
        <hr className="border-gray-200" />
        <p className="py-5 text-sm text-center text-gray-500 font-medium">
          Copyright {new Date().getFullYear()} @ UrbanCart.com - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
