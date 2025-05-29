import { Product } from '../models/product.model.js';

class ProductRepository {
  async getProducts(filter = {}, options = {}) {
    return await Product.find(filter, null, options).lean();
  }

  async findByTitle(productTitle){
    return await Product.findOne({title:  productTitle});
  }

  async addProduct(product){
    return await Product.create(product);
  }

  async getAllProducts(){
    return await Product.find().lean();
  }

  async findById(id){
    return await Product.findById({_id: id}).lean();
  }

  async deleteProduct(id){
    return await Product.deleteOne({_id: id});
  }
};

export default new ProductRepository();