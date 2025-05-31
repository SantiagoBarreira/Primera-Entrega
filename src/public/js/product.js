  async function addToCart(productId) {
    // Acá iría el fetch o redirección a endpoint para agregar al carrito
    try{
        await fetch(`/api/cart/${id}`, { method: 'POST' });
  
      }catch(error){
        console.error('Error al eliminar producto:', error);
      }
    console.log('Agregar al carrito:', productId);
  }