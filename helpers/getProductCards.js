function getProductCards (products) {

   if(!products || products.length === 0){
       return `<p>No hay productos disponibles</p>`;
   }

   let html = '<div class="products-grid">';

   for (const product of products) {
       html += `
        <div class="product-card">
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}" />
            <p>${product.price} €</p>
            <a href="/products/${product._id}">Ver detalle</a>
        </div>  
       `;
   }

   html +='</div>'

   return html;
}

module.exports = getProductCards;