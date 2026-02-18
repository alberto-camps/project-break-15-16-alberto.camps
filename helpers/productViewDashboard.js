const template = require('./template');

const productViewDashboard = (product, req) => {
    return template(`
        <h1>Producto: ${product.name}</h1>
        <img src="${product.image}" alt="${product.name}" />
        <p>${product.description}</p>
        <p><strong>${product.price} €</strong></p>
        <a href="/dashboard">Volver al dashboard</a>
            `, req);
    };

    module.exports = productViewDashboard;