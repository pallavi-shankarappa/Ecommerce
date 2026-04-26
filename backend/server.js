import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodDB.js';
import connectCloudinary from './config/cloudinary.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();
connectCloudinary();

// API Endpoints
app.get('/', (req, res) => {
  res.send("API Working");
});

// Static uploads (for local multer storage fallback)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Routes
app.use('/api/users', userRouter);
app.use('/api/product', productRouter); // Fixed: Singular "product" as per requirements
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

console.log("✅ Routes Loaded: /api/users, /api/product, /api/cart, /api/orders");

// Basic error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server error',
  });
});

app.listen(port, () => console.log(`🚀 Server started on PORT : ${port}`));
