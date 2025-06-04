import ProductRepository from '../repositories/product.repository.js';

class ProductService {

  static async getAllProducts() {
    const products = await ProductRepository.getAllProducts();
    if(!products){
      throw new Error('No hay Productos');
    }
    return products;
  }

  static async getProductById(pid) {
    const product = await ProductRepository.findById(pid);
    if(!product){
      throw new Error('No se encontro el producto')
    }
    return product;
  }
  
  static async addProduct(productData, imagePaths) {
    const existingProduct = await ProductRepository.findByTitle(productData.title);
    if(existingProduct){
      throw new Error('Este producto ya Existe')
    }
    const product = {
      title: productData.title,
      description: productData.description,
      price: parseFloat(productData.price),
      code: productData.code,
      stock: parseInt(productData.stock),
      category: productData.category,
      status: productData.status === 'on' || productData.status === true,
      thumbnails: imagePaths
    };
  
    return await ProductRepository.addProduct(product);
  }

  static async updateProduct(pid, updatedData) {
    await this.getProductById(pid);
    return await ProductRepository.updateProduct(pid,updatedData)
  }

  static async deleteProduct(pid) {
    const product = await ProductRepository.findById(pid);
    if (!product){
      throw new Error('Error al eliminar un producto');
    } 
    return await ProductRepository.deleteProduct(pid);
  }

  static async getPaginatedProducts({ limit = 10, page = 1, sort, query }) {
    const filter = {};
  
    if (query) {
      if (query.toLowerCase() === 'disponible') filter.status = true;
      else filter.category = query;
    }
  
    const options = {
      page,
      limit,
      sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {},
      lean: true
    };
  
    const result = await ProductRepository.getPaginatedProducts(filter, options);
  
    return {
      status: result ? 'success' : 'error',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null
    };
  }

}

export default ProductService;
