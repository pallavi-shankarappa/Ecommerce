import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import adminAuth from '../middleware/adminAuth.js';
import { createOrder, listMyOrders, allOrders, updateStatus } from '../controllers/orderController.js';

const router = express.Router();

// Public/User routes
router.post('/', authMiddleware, createOrder);
router.post('/place', authMiddleware, createOrder); // Backwards compatibility
router.get('/my', authMiddleware, listMyOrders);
router.get('/userorders', authMiddleware, listMyOrders); // Backwards compatibility

// Admin routes
router.get('/list', adminAuth, allOrders);
router.post('/status', adminAuth, updateStatus);

export default router;
