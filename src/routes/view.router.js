import { Router } from 'express';
import ProductManager from "../services/ProductManager.js"
const router = Router();

router.get('/home', async (req, res) => {
    const products = await ProductManager.getAllProducts();
    res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await ProductManager.getAllProducts();
    res.render('realTimeProducts', { products });
  });
  
export default router;

