import { Router } from 'express';
import ProductService from "../services/product.service.js"
import { buildPaginationData } from '../utils/pagination.js';
const router = Router();

router.get('/home', async (req, res) => {
  const products = await ProductService.getPaginatedProducts(req.query);
  const pagination = buildPaginationData('/home', products, req.query);
  res.render('home', { products: products.payload, pagination });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await ProductService.getPaginatedProducts(req.query);
  const pagination = buildPaginationData('/realtimeproducts', products, req.query);
  res.render('realTimeProducts', { products: products.payload, pagination });
});

router.get('/products', async (req, res) => {
  try {
    const result = await ProductService.getPaginatedProducts(req.query);
    const pagination = buildPaginationData('/products', result, req.query);

    res.render('products', {
      products: result.payload,
      pagination: pagination
    });
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


export default router;

