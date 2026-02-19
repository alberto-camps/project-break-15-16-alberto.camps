const template = require('./template');

function home(req) {
    const categories = [
       { name: "Camisetas", image: "https://res.cloudinary.com/dnet6blln/image/upload/v1771186566/j7uarlo4i3w2otjhwoqp.jpg" },
       { name: "Pantalones", image: "https://res.cloudinary.com/dnet6blln/image/upload/v1771505776/pantalo%CC%81n_negro_1_yya5kk.jpg" },
       { name: "Zapatos", image: "https://res.cloudinary.com/dnet6blln/image/upload/v1771505766/zapatillas_negras_suela_blanca_giwptw.jpg" },
       { name: "Accesorios", image: "https://res.cloudinary.com/dnet6blln/image/upload/v1771505786/gafas_negras_tszjqa.jpg" } 
    ];

    let cards = '';

    for(let category of categories) {
        cards += `
           <div class="category-card">
            <a href="/products?category=${category.name}">
             <img src="${category.image}" alt="${category.name}">
             <h2>${category.name}</h2>
            </a>
           </div>
        `;
    }

    return template (`
        <h1>Categorías</h1>
          <div class="categories-container">
          ${cards}
           </div>
        `, req);
};

module.exports = home;