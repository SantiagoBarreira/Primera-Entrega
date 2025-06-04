import { Router } from 'express';
import ProductService from "../services/product.service.js"
import { buildPaginationData } from '../utils/pagination.js';
import cartService from '../services/cart.service.js';
const router = Router();

router.get('/home', async (req, res) => {
  const products = await ProductService.getPaginatedProducts(req.query);
  const pagination = buildPaginationData('/home', products, req.query);
  res.render('home', { products: products.payload, pagination });
});

router.get('/realtimeproducts', async (req, res) => {
  try {

  const products = await ProductService.getPaginatedProducts(req.query);
  const pagination = buildPaginationData('/realtimeproducts', products, req.query);
  res.render('realTimeProducts', { products: products.payload, pagination });
} catch (error) {
  res.status(500).send('Error al cargar los productos');
}
});

router.get('/products/:pid', async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.pid);
    res.render('productDetails', { product });
  } catch (error) {
    res.status(404).send('Producto no encontrado');
  }
});

router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');

    const calculatedProducts = cart.products.map(item => ({
      ...item,
      subtotal: item.quantity * item.product.price
    }));

    const total = calculatedProducts.reduce((acc, p) => acc + p.subtotal, 0);
    res.render('cart', {
      cartId: req.params.cid,
      products: calculatedProducts,
      total
    });
  } catch (err) {
    res.status(500).send('Error recuperando el carrito',err);
  }
});


export default router;

