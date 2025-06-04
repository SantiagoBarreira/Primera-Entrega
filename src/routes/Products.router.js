import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

router.get('/', ProductController.getProducts);

router.get('/:pid', ProductController.getProductById);

router.post('/', upload.array('thumbnails',3), ProductController.addProduct);

router.put('/:pid', ProductController.updateProduct);

router.delete('/:pid', ProductController.deleteProduct);

export default router;