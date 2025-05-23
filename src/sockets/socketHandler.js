export default function socketHandler(io) {
  io.on('connection', async (socket) => {
    console.log('Cliente conectado');
  });
};
