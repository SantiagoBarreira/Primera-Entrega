async function addToCart(productId) {
  try {
    let cartId = localStorage.getItem('cartId');
    // Verifico si el carrito guardado realmente existe
    if (cartId) {
      const verify = await fetch(`/api/carts/${cartId}`);
      if (!verify.ok) {
        console.warn('⚠️ El carrito no existe en la base de datos. Creando uno nuevo...');
        cartId = null;
        localStorage.removeItem('cartId');
      }
    }
    // Si no hay carrito válido, creo uno nuevo
    if (!cartId) {
      const createRes = await fetch('/api/carts', { method: 'POST' });
      const createData = await createRes.json();
      cartId = createData._id;
      localStorage.setItem('cartId', cartId);
    }

    // Agrego el producto al carrito
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'POST'
    });
    if (response.ok) {
      alert('Producto agregado al carrito');
    } else {
      const result = await response.json();
      alert('Error: ' + result.error + 'asdaasdasds');
    }
  } catch (err) {
    console.error('Error al agregar al carrito:', err);
  }
}


async function deleteProductFromCart(productId, cartId){
  try {
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Producto eliminado');
    } else {
      const result = await response.json();
      alert('Error: ' + result.error);
    }
    
  } catch (error) {
    console.error('Error al eliminar un producto del carrito:', error);
  }
}

async function emptyCart(cartId){
  try {
    const response = await fetch(`/api/carts/${cartId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Carrito Vaciado');
    } else {
      const result = await response.json();
      alert('Error: ' + result.error);
    }
    
  } catch (error) {
    console.error('Error al eliminar un producto del carrito:', error);
  }
}