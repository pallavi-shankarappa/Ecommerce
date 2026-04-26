import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Collection = () => {
  const { products, search, showSearch, loading, error } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilterAndSort = () => {
    let temp = products.slice();

    // Apply Filters
    if (showSearch && search) {
      temp = temp.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      temp = temp.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      temp = temp.filter((item) => subCategory.includes(item.subCategory));
    }

    // Apply Sorting
    switch (sortType) {
      case "low-high":
        temp.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        temp.sort((a, b) => b.price - a.price);
        break;
      default:
        // No sorting needed (default relevant)
        break;
    }

    setFilterProducts(temp);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [category, subCategory, search, showSearch, products, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 font-bold"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block rounded-lg`}
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-wider">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex gap-2 items-center cursor-pointer hover:text-black">
                <input
                  className="w-4 h-4 accent-black"
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                />{" "}
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block rounded-lg`}
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-wider">Type</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <label key={sub} className="flex gap-2 items-center cursor-pointer hover:text-black">
                <input
                  className="w-4 h-4 accent-black"
                  type="checkbox"
                  value={sub}
                  onChange={toggleSubCategory}
                />{" "}
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between items-center text-base sm:text-2xl mb-6">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-3 py-2 outline-none rounded-lg font-medium cursor-pointer"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price: Low to High</option>
            <option value="high-low">Sort by: Price: High to Low</option>
          </select>
        </div>

        {/* Loading / Error / Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 aspect-square rounded-lg"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-medium">{error}</div>
        ) : filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                _id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-400 text-lg font-medium">No products match your current filters.</p>
            <button 
              onClick={() => {
                setCategory([]);
                setSubCategory([]);
                setSortType("relevant");
                // Clear checkboxes manually or via state if controlled
              }}
              className="mt-4 text-black underline font-bold"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
