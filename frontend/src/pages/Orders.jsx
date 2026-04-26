import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { api } from '../services/api';
import { resolveProductImage } from '../utils/resolveImage';

const Orders = () => {
  const { currency, token, backendUrl } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      setLoading(true);
      const response = await api.get('/api/orders/my', { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.createdAt;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("❌ Load Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-8">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading your orders...</div>
        ) : orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-6 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:bg-gray-50 transition-colors px-2"
            >
              <div className="flex items-start gap-6 text-sm">
                <img 
                  className="w-16 sm:w-24 rounded-lg shadow-sm aspect-square object-cover" 
                  src={resolveProductImage(item.product?.image[0], backendUrl)} 
                  alt={item.product?.name} 
                />
                <div className="flex flex-col gap-1">
                  <p className="sm:text-lg font-bold text-black">{item.product?.name}</p>
                  <div className="flex items-center gap-4 mt-1 text-base text-gray-600 font-medium">
                    <p>{currency}{item.price.toLocaleString()}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p className="px-2 py-0.5 bg-gray-100 rounded text-xs">Size: {item.size}</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Date: <span className="text-gray-400 font-medium">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment: <span className="text-gray-400 font-medium">{item.paymentMethod.toUpperCase()}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <p className={`min-w-2.5 h-2.5 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-400'}`}></p>
                  <p className="text-sm md:text-base font-semibold">{item.status}</p>
                </div>
                <button 
                  onClick={loadOrderData} 
                  className="border border-gray-300 px-6 py-2.5 text-sm font-bold rounded-lg hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-32 text-gray-400">
            <p className="text-xl">You haven't placed any orders yet.</p>
            <button 
              onClick={() => (window.location.href = '/collection')}
              className="mt-6 bg-black text-white px-8 py-3 rounded-lg font-bold"
            >
              START SHOPPING
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
