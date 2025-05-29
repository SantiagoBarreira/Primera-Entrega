import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number
    }
  ]
});

export const Cart = mongoose.model('Cart', cartSchema);


// class Cart {
//     constructor(id, products = []) {
//       this.id = id; 
//       this.products = products;
//     }
//   }

// export default Cart;
  