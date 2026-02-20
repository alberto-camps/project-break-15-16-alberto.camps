const template = require('./template');

const productDetailView = (product, req) => {
    return template(`
        <div class="product-detail">
            <img src="${product.image}" alt="${product.name}" />
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <p><strong>${product.price} €</strong></p>
            <a href="/products?category=${product.category}">Volver a ${product.category}</a>
        </div>
            `, req);
};

module.exports = productDetailView;