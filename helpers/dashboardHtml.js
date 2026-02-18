function generateDashboardHtml(products) {
    if (!products || products.length === 0) {
        return `<p>No hay productos disponibles</p>`;
    }

    let html = '';

    for (const product of products) {
        html += `
        <div class="productDashboard-card">
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}" />
            <p>${product.price} €</p>
            <a href="/dashboard/${product._id}">Ver detalle</a>
            <a href="/dashboard/${product._id}/edit">Editar</a>
            <form action="/dashboard/${product._id}/delete" method="POST">
                <button type="submit">Eliminar</button>
            </form>
        </div>  
       `;
    }

    return html;
}

module.exports = generateDashboardHtml;