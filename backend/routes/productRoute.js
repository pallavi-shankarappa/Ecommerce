import express from 'express';
import { listProducts, addProduct, removeProduct, getProductById } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Public routes
productRouter.get('/', listProducts);
productRouter.get('/list', listProducts); // Required: GET /api/product/list
productRouter.get('/single/:id', getProductById); // Fixed to match RESTful /single/:id
productRouter.post('/single', getProductById); // Aliased for backward compatibility

// Admin Protected routes
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
);

productRouter.post('/remove', adminAuth, removeProduct);
productRouter.delete('/remove/:id', adminAuth, (req, res) => {
  req.body.id = req.params.id;
  return removeProduct(req, res);
});

console.log("✅ Product Routes Initialized");

export default productRouter;
