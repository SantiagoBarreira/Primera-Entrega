import { Router } from 'express';
import ProductService from "../services/product.service.js"
import ProductController from '../controllers/product.controller.js';
const router = Router();

router.get('/',  ProductController.getProducts);
    // const products = await ProductService.getAllProducts();

router.get('/:pid', async (req, res) => {
    const product = await ProductService.getProductById(parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else res.status(404).json({ message: 'Producto no encontrado' });
});

router.post('/', ProductController.addProduct);

router.put('/:pid', async (req, res) => {
    const updated = await ProductService.updateProduct(parseInt(req.params.pid), req.body);
    if (updated) res.json(updated);
    else res.status(404).json({ message: 'Producto no encontrado' });
});

router.delete('/:pid', ProductController.deleteProduct);
//     try {
//         const deleted = await ProductService.deleteProduct(parseInt(req.params.pid));
//         if (deleted) res.json({ message: 'Producto eliminado' });
//         const products = await ProductService.getAllProducts();
//         req.app.locals.io.emit('productsUpdated', products);

//     } catch (err) {
//         res.status(404).json({ error: 'Producto no encontrado' });
//     }
// });

export default router;