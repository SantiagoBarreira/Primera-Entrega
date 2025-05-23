import FileHelper from '../helpers/FileHelper.js';
import Product from '../models/Product.js';

const PRODUCTS_PATH = './data/products.json';

class ProductManager {

  static async getAllProducts() {
    return await FileHelper.readJSON(PRODUCTS_PATH);
  }

  static async getProductById(pid) {
    const products = await this.getAllProducts();
    return products.find(prod => prod.id === pid);
  }

  static async addProduct(productData) {
    const products = await this.getAllProducts();
    const newProduct = new Product(productData);
    newProduct.id = this.generateId(products)
    products.push({...newProduct});
    await FileHelper.writeJSON(PRODUCTS_PATH, products);
    return newProduct;
  }

  static async updateProduct(pid, updatedData) {
    const products = await this.getAllProducts();
    const index = products.findIndex(p => p.id === pid);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updatedData, id: products[index].id };
    await FileHelper.writeJSON(PRODUCTS_PATH, products);
    return products[index];
  }

  static async deleteProduct(pid) {
    const products = await this.getAllProducts();
    const index = products.findIndex(p => p.id === pid);
    if (index === -1) return null;
    const deleted = products.splice(index, 1);
    await FileHelper.writeJSON(PRODUCTS_PATH, products);
    return deleted[0];
  }

  static generateId(products) {
    return products.length > 0 ? Math.max(...products.map(prod => prod.id)) + 1 : 1;
  }
}

export default ProductManager;
