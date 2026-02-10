function getProductCards (products) {

   if(!products || products.length === 0){
       return `<p>No hay productos disponibles</p>`;
   }

   let html = '';

   for (const product of products) {
       html += `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" />
            <h2>${product.name}</h2>
            <p>${product.price} €</p>
            <a href="/products/${product._id}">Ver detalle</a>
        </div>  
       `;
   }

   return html;
}

module.exports = getProductCards;