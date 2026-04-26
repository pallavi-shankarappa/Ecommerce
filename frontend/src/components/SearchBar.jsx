import React from "react";
import { assets } from '../assets/assets';
import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection') && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 py-4 px-6 flex justify-center">
      {/* Full-width search bar */}
      <div className="flex items-center w-full max-w-2xl border border-gray-400 px-4 py-2 rounded-full bg-white shadow-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent px-2 text-gray-700"
          type="text"
          placeholder="Search products..."
        />
        
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="w-7 ml-3 cursor-pointer hover:scale-110 transition"
        src={assets.cross_icon}
        alt=""
      />
      
    </div>
  ) : null;
};

export default SearchBar;
