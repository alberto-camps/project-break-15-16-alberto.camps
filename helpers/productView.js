const template = require('./template');

const productDetailView = (product, req) => {
    return template(`
        <div class="product-detail">
            <img src="${product.image}" alt="${product.name}" />
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <p><strong>${product.price} €</strong></p>
            <a href="/products">Volver a la tienda</a>
        </div>
            `, req);
};

module.exports = productDetailView;