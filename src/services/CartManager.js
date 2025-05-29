import FileHelper from '../helpers/FileHelper.js';
import ProductService from './product.service.js';
const CARTS_PATH = './data/carts.json';
class CartManager {

    static async getCarts() {
        return await FileHelper.readJSON(CARTS_PATH).catch(() => []);
    }

    static async createCart() {
        const carts = await this.getCarts();
        const newCart = { id: this.generateId(carts), products: [] };
        carts.push(newCart);
        await FileHelper.writeJSON(CARTS_PATH, carts);
        return newCart;
    }

    static async getCartById(id) {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === id)
        if (!cart) res.status(404).json({ error: 'Carrito no encontrado' });

        const productDetails = await Promise.all(cart.products.map(async (item) => {
            const product = await ProductService.getProductById(item.product);
            return {
                product: product,
                quantity: item.quantity
            };
        }));

        return {
            id: cart.id,
            products: productDetails // Array con los productos y cantidades
        };
    }

    static async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cartId);

        if (!cart) {
            return { error: 'Carrito no encontrado' };
        }
        const existingProduct = cart.products.find(p => p.product === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await FileHelper.writeJSON(CARTS_PATH, carts);
        return cart;
    }

    static generateId(products) {
        return products.length > 0 ? Math.max(...products.map(prod => prod.id)) + 1 : 1;
    }
}

export default CartManager;