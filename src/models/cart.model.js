import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        index: true
      },
      quantity: Number
    }
  ]
});

export const Cart = mongoose.model('Cart', cartSchema);


