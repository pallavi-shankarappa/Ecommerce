import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    size: { type: String, default: null },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
    phone: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    items: { type: [orderItemSchema], required: true },
    address: { type: addressSchema, required: true },
    paymentMethod: { type: String, enum: ['stripe', 'razorpay', 'cod'], default: 'cod' },
    total: { type: Number, required: true },
    status: { type: String, default: 'created' },
  },
  { timestamps: true }
);

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;

