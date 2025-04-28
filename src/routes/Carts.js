import { Router } from 'express';
import CartManager from '../services/CartManager.js';

const router = Router();

router.post('/', async (req, res) => {
  const newCart = await CartManager.createCart();
  res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
  const cart = await CartManager.getCartById(parseInt(req.params.cid));
  if (cart) res.json(cart.products);
  else res.status(404).json({ message: 'Carrito no encontrado' });
});

router.post('/:cid/product/:pid', async (req, res) => {
  const updatedCart = await CartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
  if (updatedCart) res.json(updatedCart);
  else res.status(404).json({ message: 'Carrito o Producto no encontrado' });
});

export default router;

