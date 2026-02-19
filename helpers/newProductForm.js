const template = require('./template');

const newProductForm = (product, req) => {
    return template(`
        <h1>Crear nuevo producto</h1>
        <form action="/dashboard" method="POST" enctype="multipart/form-data">
            <label>Nombre:</label>
            <input type="text" name="name" required />

            <label>Descripción:</label>
            <textarea name="description" required></textarea>

            <label>Imagen:</label>
            <input type="file" name="image" required />

            <label>Categoría:</label>
            <select name ="category" required>
                <option value="">Selecciona categoría</option>
                <option value="Camisetas">Camisetas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
            </select>

            <label>Talla:</label>
            <select name="size" required>
                <option value="">Selecciona talla</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            
            <label>Precio:</label>
            <input type="number" name="price" required />

            <button type="submit">Crear producto</button>
            <a href="/dashboard">Volver al dashboard</a>
        </form>
            `, req);
}

module.exports = newProductForm;