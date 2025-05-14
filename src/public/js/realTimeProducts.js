const socket = io();

  const form = document.getElementById('productForm');
  const productList = document.getElementById('productList');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const product = Object.fromEntries(formData.entries());
    product.price = Number(product.price);
    product.stock = Number(product.stock);
    product.status = formData.get('status') === 'on';

    socket.emit('newProduct', product);
    form.reset();
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

  function deleteProduct(id) {
    socket.emit('deleteProduct', id);
  }