import { Cart } from '../models/cart.model.js';

class CartRepository {
  async createCart() {
    return await Cart.create({ products: [] });
  }

  async findById(cid) {
    return await Cart.findById(cid).populate('products.product').lean();
  }

  async deleteCart(cid) {
    return await Cart.findByIdAndDelete(cid);
  }

  async findCartById(cid) {
    return await Cart.findById(cid);
  }

  async deleteProductFromCart(cid, pid) {
    const cart = await this.findCartById(cid);
    const productToRemove = cart.products.find(p => p.product == pid);

    if (!productToRemove) {
      throw new Error('Producto no encontrado en el carrito');
    }
    return await Cart.findByIdAndUpdate(
      cid,
      { $pull: { products: { _id: productToRemove._id } } },
      { new: true }
    );
  }

  async updateCartProducts(cid, newProducts) {
    return await Cart.findByIdAndUpdate(
      cid,
      { products: newProducts },
      { new: true }
    );
  }

  async updateProductQuantity(cid, pid, quantity) {
    return await Cart.findOneAndUpdate(
      { _id: cid, 'products.product': pid },
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
    );
  }

  async clearCart(cid) {
    return await Cart.findByIdAndUpdate(cid, { products: [] }, { new: true });
  }

  async findCartsWithProduct(productId) {
    return await Cart.find({ 'products.product': productId });
  }

}

export default new CartRepository();
