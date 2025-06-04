import CartRepository from '../repositories/cart.repository.js';

class CartService {
  async createCart() {
    return CartRepository.createCart();
  }

  async getCartById(cid) {
    return CartRepository.findById(cid);
  }

  async deleteCart(cid) {
    return CartRepository.deleteCart(cid);
  }

  async removeProductFromCart(cid, pid) {
    return CartRepository.deleteProductFromCart(cid, pid);
  }

   async cartHaveProduct(pid){
    return await CartRepository.findCartsWithProduct(pid);
  }


  async updateCart(cid, newProducts) {
    if (!Array.isArray(newProducts)) {
      throw new Error('El cuerpo debe ser un array de productos');
    }
  
    const valid = newProducts.every(
      (item) => item.product && typeof item.quantity === 'number' && item.quantity >= 1
    );
  
    if (!valid) {
      throw new Error('Cada producto debe tener un ID y una cantidad numérica válida (>= 1)');
    }
    return CartRepository.updateCartProducts(cid, newProducts);
  }

  async updateQuantity(cid, pid, quantity) {
    if (quantity < 1) {
      throw new Error('La cantidad debe ser mayor a 0');
    }
    return CartRepository.updateProductQuantity(cid, pid, quantity);
  }

  async clearCart(cid) {
    const cart = await CartRepository.clearCart(cid);
    if (!cart) throw new Error('Carrito no encontrado');
    return cart;
  }

}

export default new CartService();

