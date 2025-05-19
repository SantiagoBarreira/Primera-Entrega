const socket = io();

  const form = document.getElementById('productForm');
  const productList = document.getElementById('productList');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const product = Object.fromEntries(formData.entries());
    product.price = Number(product.price);
    product.stock = Number(product.stock);
    product.status = formData.get('status') === 'on';

    // socket.emit('newProduct', product); //Esto para hacerlo con socket
    try{
      await fetch('/api/products', {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
  
      form.reset();

    }catch(error){
      console.error('Error al agregar producto:', error);
    }
  });

  socket.on('productsUpdated', products => {
    productList.innerHTML = '';
    products.forEach(p => {
      productList.innerHTML += `
        <li><b>${p.title}</b> - ${p.description} - $${p.price}
          <button onclick="deleteProduct(${p.id})">Eliminar</button>
        </li>`;
    });
  });

  async function deleteProduct(id) {
    // socket.emit('deleteProduct', id); //Esto para hacerlo con socket
    try{
      await fetch(`/api/products/${id}`, { method: 'DELETE' });

    }catch(error){
      console.error('Error al eliminar producto:', error);
    }
  }