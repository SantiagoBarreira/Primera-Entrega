import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true, index: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true, index: true },
  status: { type: Boolean, required: true, default: true, index: true },
  thumbnails: { type: [String] },
});

productSchema.plugin(mongoosePaginate);

export const Product = mongoose.model('Product', productSchema);

