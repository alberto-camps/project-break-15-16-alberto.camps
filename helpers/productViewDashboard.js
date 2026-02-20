const template = require('./template');

const productViewDashboard = (product, req) => {
    return template(`
      <div class="dashboardDetail">
        <h1>Producto: ${product.name}</h1>

        <div class="dashboardDetailCard">
          <img src="${product.image}" alt="${product.name}" />

        <div class="dashboardDetailInfo">  
          <p>${product.description}</p>
          <p>Size: ${product.size}</p>
          <p><strong>${product.price} €</strong></p>

        <div class="dashboardActions">  
          <a href="/dashboard/${product._id}/edit">Editar producto</a>
          <a href="/dashboard">Volver al dashboard</a>
        </div>
        </div>
        </div>
      </div>
    `, req);
    };

    module.exports = productViewDashboard;