import CartService from '../services/cart.service.js';

class CartController {
  static async getCart(req, res) {
    try {
      const cart = await CartService.getCartById(req.params.cid);
      if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createCart(req, res) {
    try {
      const cart = await CartService.createCart();
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async deleteCart(req, res) {
    try {
      const { cid } = req.params;
      const result = await CartService.clearCart(cid);
      res.json({ message: 'Carrito vaciado correctamente', cart: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const updatedCart = await CartService.removeProductFromCart(req.params.cid, req.params.pid);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateCart(req, res) {
    try {
      const updatedCart = await CartService.updateCart(req.params.cid, req.body.products);
      res.json({ message: 'Carrito reemplazado', cart: updatedCart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await CartService.getCartById(cid);
      if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
  
      const existingProduct = cart.products.find(p => {
        const productId = typeof p.product === 'object' ? p.product._id.toString() : p.product.toString();
        return productId === pid;
      });
      if (existingProduct) {
        // Si ya existe, actualiza la cantidad
        await CartService.updateQuantity(cid, pid, existingProduct.quantity + 1);
      } else {
        // Si no existe, lo agrega
        cart.products.push({ product: pid, quantity: 1 });
        await CartService.updateCart(cid, cart.products);
      }
      
      res.json({ message: 'Producto agregado al carrito' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProductQuantity(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      if (!quantity || isNaN(quantity)) {
         res.status(400).json({ error: 'Cantidad inválida' });
      }

      const updatedCart = await CartService.updateQuantity(cid, pid, quantity);
      res.json({ message: 'Cantidad actualizada', cart: updatedCart });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default CartController;
