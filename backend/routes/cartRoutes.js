import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addToCart, updateCart, removeFromCart, getCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.put('/', authMiddleware, updateCart);
router.delete('/:id', authMiddleware, removeFromCart);

export default router;

