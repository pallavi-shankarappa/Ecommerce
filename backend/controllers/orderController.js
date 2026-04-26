import cartModel from '../models/cartModel.js';
import orderModel from '../models/orderModel.js';
import productModel from '../models/productModel.js';
import userModel from '../models/userModel.js';

// Place order
export const createOrder = async (req, res) => {
  try {
    const { address, paymentMethod = 'cod' } = req.body;
    if (!address) return res.status(400).json({ success: false, message: 'address is required' });

    const cart = await cartModel.findOne({ user: req.user._id }).lean();
    const cartItems = cart?.items || [];
    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const productIds = cartItems.map((i) => i.product);
    const products = await productModel.find({ _id: { $in: productIds } }).select('_id price').lean();
    const priceById = new Map(products.map((p) => [String(p._id), Number(p.price)]));

    const items = cartItems.map((i) => {
      const price = priceById.get(String(i.product));
      if (price == null) {
        throw new Error('One or more products no longer exist');
      }
      return { product: i.product, size: i.size || null, quantity: i.quantity, price };
    });

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await orderModel.create({
      user: req.user._id,
      items,
      address,
      paymentMethod,
      total,
      status: 'Order Placed',
    });

    // Clear cart after order
    await cartModel.findOneAndUpdate({ user: req.user._id }, { $set: { items: [] } });
    await userModel.findByIdAndUpdate(req.user._id, { cartData: {} });

    res.status(201).json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user orders
export const listMyOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.product')
      .lean();
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Get all orders
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 }).populate('user', 'name email').populate('items.product');
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update status
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
