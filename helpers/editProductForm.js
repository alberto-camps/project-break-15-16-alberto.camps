const template = require('./template');

const editProductForm = (product, req) => {
    return template(`
        <h1 class='editProduct-h1'>Editar producto</h1>
        <div class='editProductContainer'>
        <form action="/dashboard/${product._id}?_method=PUT" method="POST">
            <input type="text" name="name" value="${product.name}" required />
            <textarea name="description" required>${product.description}</textarea>
            <input type="text" name="image" value="${product.image}" required />
            <select name="category" required>
                <option value="${product.category}" selected>${product.category}</option>
                <option value="Camisetas">Camisetas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
            </select>
            <select name="size" required>
                <option value="${product.size}" selected>${product.size}</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            <input type="number" name="price" value="${product.price}" required />
            <button type="submit">Actualizar producto</button>
            <a href="/dashboard" class='updateProductLink'>Volver al dashboard</a>
        </form>
        </div>`, req);
}

module.exports = editProductForm