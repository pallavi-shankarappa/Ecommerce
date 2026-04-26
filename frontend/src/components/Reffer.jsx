import React from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Refer = () => {
  const referralCode = "REF200";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied to clipboard!");
  };

  return (
    <div className="my-20 bg-gray-50 rounded-2xl p-10 sm:p-20 flex flex-col items-center text-center border border-dashed border-gray-300">
      <img
        src={assets.reffer_icon}
        alt="Refer & Earn"
        className="w-16 h-16 mb-6 hover:rotate-12 transition-transform duration-300"
      />
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Refer & Earn <span className="text-black">₹200</span></h2>
      <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-md">
        Invite your friends to UrbanCart and earn ₹200 for every successful referral. 
        Your friend gets a special discount on their first purchase too!
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
        <div className="bg-white border border-gray-200 px-6 py-3 rounded-lg flex-1 font-mono font-bold text-lg tracking-widest text-black">
          {referralCode}
        </div>
        <button
          onClick={handleCopy}
          className="bg-black text-white px-10 py-3.5 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg w-full sm:w-auto"
        >
          COPY CODE
        </button>
      </div>
    </div>
  );
};

export default Refer;
