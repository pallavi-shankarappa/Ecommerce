import cartModel from '../models/cartModel.js';
import productModel from '../models/productModel.js';
import userModel from '../models/userModel.js';
const syncLegacyCart = async (userId, items) => {
  const cartData = {};
  for (const item of items) {
    const pid = String(item.product);
    const size = item.size || 'default';
    if (!cartData[pid]) cartData[pid] = {};
    cartData[pid][size] = item.quantity;
  }
  await userModel.findByIdAndUpdate(userId, { cartData });
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    let cart = await cartModel.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      cart = await cartModel.create({ user: req.user._id, items: [] });
    }
    res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity = 1 } = req.body;
    
    if (!productId) return res.status(400).json({ success: false, message: 'productId is required' });
    
    const qty = Number(quantity);
    if (qty < 1) return res.status(400).json({ success: false, message: 'Invalid quantity' });

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
      cart = new cartModel({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (i) => String(i.product) === String(productId) && i.size === (size || null)
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += qty;
    } else {
      cart.items.push({ product: productId, size: size || null, quantity: qty });
    }

    await cart.save();
    await syncLegacyCart(req.user._id, cart.items);

    res.json({ success: true, message: "Added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update cart quantity
export const updateCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const qty = Number(quantity);

    if (!productId) return res.status(400).json({ success: false, message: 'productId is required' });

    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(
      (i) => String(i.product) === String(productId) && i.size === (size || null)
    );

    if (itemIndex > -1) {
      if (qty <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = qty;
      }
      await cart.save();
      await syncLegacyCart(req.user._id, cart.items);
      res.json({ success: true, message: "Cart updated", cart });
    } else {
      res.status(404).json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; // productId
    const { size } = req.body;

    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    cart.items = cart.items.filter(
      (i) => !(String(i.product) === String(id) && i.size === (size || null))
    );

    await cart.save();
    await syncLegacyCart(req.user._id, cart.items);

    res.json({ success: true, message: "Removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
