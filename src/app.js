import express  from "express";
import productsRouter from './routes/Products.router.js';
import cartsRouter from './routes/Carts.router.js';
import viewRouter from './routes/view.router.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import socketHandler from "./sockets/socketHandler.js";

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

//websocket
app.locals.io = io;
socketHandler(io)

httpServer.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto CAMBIAMOS: ${PORT}`);
});

