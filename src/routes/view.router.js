import { Router } from 'express';
import ProductService from "../services/product.service.js"
const router = Router();

router.get('/home', async (req, res) => {
    const products = await ProductService.getAllProducts();
    res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await ProductService.getAllProducts();
    res.render('realTimeProducts', { products });
  });
  
export default router;

