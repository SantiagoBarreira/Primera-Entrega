const socket = io();

const form = document.getElementById('productForm');
const productList = document.querySelector('.product-grid');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(form);

  try {
    await fetch('/api/products', {
      method: 'POST',
      body: formData
    });

    form.reset();

  } catch (error) {
    console.error('Error al agregar producto:', error);
  }
});

socket.on('productsUpdated', products => {
  productList.innerHTML = '';
  products.forEach(p => {
    productList.innerHTML += `
      <div class="product-card">
        <br />
        <div>
          ${p.thumbnails?.[0] ? `<img src="${p.thumbnails[0]}" alt="${p.title}" />` : ''}
        </div>
        <h3>${p.title}</h3>
        <p><strong>Precio:</strong> $${p.price}</p>
        <p><strong>Categoría:</strong> ${p.category}</p>
        <p>${p.description}</p>
        <a href="/view/products/${p._id}">Ver detalles</a>
        <button onclick="addToCart('${p._id}')">Agregar al carrito</button>
        <br><br>
        <button onclick="deleteProduct('${p._id}')">Eliminar producto</button>
      </div>
    `;
  });
});

async function deleteProduct(id) {
  try {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
  } catch (error) {
    alert('Error al eliminar producto:', error);
  }
}