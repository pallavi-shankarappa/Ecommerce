import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const resolveImage = (imgName) => {
    if (!imgName) return "";
    if (imgName.startsWith("http")) return imgName;
    return `${backendUrl}/uploads/${imgName}`;
  };

  return (
    <>
      <p className="mb-4 font-bold text-2xl">Product Inventory</p>
      <div className="flex flex-col gap-2">
        {/* ------- List Table Title ------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border bg-gray-100 text-sm font-bold rounded-t-lg">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------- Product List ------- */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-3 px-4 border text-sm hover:bg-gray-50 transition-colors"
            key={index}
          >
            <img 
              className="w-16 h-16 object-cover rounded shadow-sm" 
              src={resolveImage(item.image[0])} 
              alt={item.name} 
            />
            <p className="font-bold text-gray-800">{item.name}</p>
            <p className="hidden md:block text-gray-600">{item.category}</p>
            <p className="font-bold">
              {currency}{item.price.toLocaleString()}
            </p>
            <div className="text-right md:text-center">
              <button
                onClick={() => removeProduct(item._id)}
                className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-full transition-all duration-300"
                title="Remove Product"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="text-center py-20 bg-gray-50 border rounded-b-lg">
            <p className="text-gray-400 text-lg">Your inventory is empty.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
