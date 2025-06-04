import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';

const router = Router();

router.post('/', CartController.createCart);
router.get('/:cid', CartController.getCart);
router.delete('/:cid', CartController.deleteCart);
router.delete('/:cid/products/:pid', CartController.deleteProduct);
router.put('/:cid', CartController.updateCart); 
router.put('/:cid/products/:pid', CartController.updateProductQuantity);
router.post('/:cid/products/:pid', CartController.addProductToCart);

export default router;
