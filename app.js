import express  from "express";
import productsRouter from './src/routes/Products.router.js';
import cartsRouter from './src/routes/Carts.router.js';
import viewRouter from './src/routes/view.router.js';
import ProductManager from './src/services/ProductManager.js'
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/view', viewRouter); //Handlebars

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve('src/views'));

// Static files
app.use(express.static('src/public'));
app.locals.io = io;

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  
//Este bloque es para usar los socket: Sugerencia 1 de la letra
//   socket.on('newProduct', async (product) => {
//     await ProductManager.addProduct(product);
//     const products = await ProductManager.getAllProducts();
//     io.emit('productsUpdated', products);
//   });

//   socket.on('deleteProduct', async (id) => {
//     await ProductManager.deleteProduct(id);
//     const products = await ProductManager.getAllProducts();
//     io.emit('productsUpdated', products);
//   });

});

httpServer.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto CAMBIAMOS: ${PORT}`);
});

