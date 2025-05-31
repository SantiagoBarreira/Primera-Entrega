import ProductService from '../services/product.service.js';

class ProductController {

    async getProducts(req, res) {
        const { limit, page, sort, query } = req.query;
    
        try {
          const result = await ProductService.getPaginatedProducts({
            limit: parseInt(limit) || 10,
            page: parseInt(page) || 1,
            sort,
            query
          });
    
          res.json(result);
        } catch (err) {
          res.status(500).json({ status: 'error', message: err.message });
        }
      }

    async getProductById(req, res) {
        const product = await ProductService.getProductById(req.params.pid);
        if (product) res.json(product);
        else res.status(404).json({ message: 'Producto no encontrado' });
    };

    async addProduct(req, res) {
        try {
            const newProduct = await ProductService.addProduct(req.body);
            const products = await ProductService.getPaginatedProducts({ limit: 10, page: 1 })

            req.app.locals.io.emit('productsUpdated', products.payload)

            res.status(201).json({ message: 'Producto Agregado', newProduct });
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    };

    async updateProduct(req, res) {
        const updated = await ProductService.updateProduct(req.params.pid, req.body);
        if (updated) res.json(updated);
        else res.status(404).json({ message: 'Producto no encontrado' });
    };

    async deleteProduct(req, res) {
        try {
            await ProductService.deleteProduct(req.params.pid);
            const products = await ProductService.getPaginatedProducts({ limit: 10, page: 1 });
            req.app.locals.io.emit('productsUpdated', products.payload);
            res.json({ message: 'Producto eliminado' });
        } catch (error) {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    };
};
export default new ProductController();
