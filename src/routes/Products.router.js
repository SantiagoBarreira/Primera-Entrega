import { Router } from 'express';
import ProductManager from "../services/ProductManager.js"
const router = Router();

router.get('/', async (req, res) => {
    const products = await ProductManager.getAllProducts();
    res.json(products);
});

router.get('/:pid', async (req, res) => {
    const product = await ProductManager.getProductById(parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else res.status(404).json({ message: 'Producto no encontrado' });
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await ProductManager.addProduct(req.body);
        const products = await ProductManager.getAllProducts();
        req.app.locals.io.emit('productsUpdated', products)

        res.status(201).json(newProduct);

    } catch {
        res.status(500).json({ error: err.message })
    }
});

router.put('/:pid', async (req, res) => {
    const updated = await ProductManager.updateProduct(parseInt(req.params.pid), req.body);
    if (updated) res.json(updated);
    else res.status(404).json({ message: 'Producto no encontrado' });
});

router.delete('/:pid', async (req, res) => {
    try{
        const deleted = await ProductManager.deleteProduct(parseInt(req.params.pid));
        if (deleted) res.json({ message: 'Producto eliminado' });
        const products = await ProductManager.getAllProducts();
        req.app.locals.io.emit('productsUpdated', products);

    }catch(err){
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

export default router;