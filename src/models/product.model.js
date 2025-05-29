import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  thumbnails: { type: [String] },
});

export const Product = mongoose.model('Product', productSchema);


// class Product {
//  id = 0;
//     constructor({ title, description, code, price, status, stock, category, thumbnails }) {
//         this.title = title;
//         this.description = description;
//         this.code = code;
//         this.price = price;
//         this.status = status !== undefined ? false : status;
//         this.stock = stock;
//         this.category = category;
//         this.thumbnails = thumbnails;
//     }

// }

// export default Product;

