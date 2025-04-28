import express  from "express";
import productsRouter from './src/routes/Products.js';
import cartsRouter from './src/routes/Carts.js';

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto CAMBIAMOS: ${PORT}`);
});

