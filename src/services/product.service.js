import FileHelper from '../helpers/FileHelper.js';
import {Product} from '../models/product.model.js';
import ProductRepository from '../repositories/product.repository.js';

const PRODUCTS_PATH = './data/products.json';

class ProductService {

  static async getAllProducts() {
    const products = await ProductRepository.getAllProducts();
    if(!products){
      throw new Error('No hay Productos');
    }
    return products;
  }

  static async getProductById(pid) {
    const products = await this.getAllProducts();
    return products.find(prod => prod.id === pid);
  }

  static async addProduct(productData) {
    const existingProduct = await ProductRepository.findByTitle(productData.title);
    if(existingProduct){
      throw new Error('Este producto ya Existe')
    }
    return await ProductRepository.addProduct(productData);
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
    const product = await ProductRepository.findById(pid);
    if (!product){
      throw new Error('Error al eliminar un producto');
    } 
    return await ProductRepository.deleteProduct(pid);
  }
}

export default ProductService;
