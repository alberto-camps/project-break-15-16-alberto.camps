/**
 * productController.js
 * Controlador de productos: CRUD y gestión de productos
 */

const { error } = require("node:console")
const ProductModel = require("../models/Product")
const template = require('../helpers/template');
const getProductCards = require('../helpers/getProductCards');
const generateDashboardHtml = require('../helpers/dashboardHtml');

const productController = {

    //Convertir datos a HTML para que devuelva la web
    showProductsHtml: async (req, res) => {
        try {
            const products = await ProductModel.find();
            const cardsHtml = getProductCards(products);
            const html = template(cardsHtml);
            res.send(html)
        } catch(error) {
            console.error(error);
            res.status(500).send('Error al cargar productos');
        }
    },

    //Vista HTML detalle de producto
    showProductDetailHtml: async(req, res) => {
        try {
            const { productId } = req.params;
            const product = await ProductModel.findById(productId);

            if(!product) {
                return res.status(404).send('Producto no encontrado');
            }

            const html = template(`
                <div class="product-detail">
                  <img src="${product.image}" alt="${product.name}" />
                  <h1>${product.name}</h1>
                  <p>${product.description}</p>
                  <p><strong>${product.price} €</strong></p>
                  <a href="/products">Volver a la tienda</a>
                </div>
            `);

            res.send(html);
        }catch(error){
            console.error(error);
            res.status(500).send('Error al cargar el producto');
        }
    },


    // ------------TIENDA PÚBLICA------------
    showProducts: async (req,res) => {
        try {
            const products = await ProductModel.find()
            const productsWithLinks = products.map(product => {
                return {
                    productId: product._id,
                    name: product.name,
                    description: product.description,
                    image: product.image,
                    category: product.category,
                    size: product.size,
                    price: product.price,
                    link: `/products/${product._id}`
            }})
            res.json({data:productsWithLinks, message:"Productos obtenidos correctamente"})
        } catch (error) {
            console.error("Error al obtener productos:", error)
            res.status(500).json("Error al obtener productos")
        }
    },

    

    showProductById: async (req,res) => {
        try {
            const id = req.params.productId
            const product = await ProductModel.findById(id)
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.json({data:product, message:"Producto obtenido correctamente"})
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error while fetching product details" });
        }
    },


    // ------------DASHBOARD DE ADMINISTRACIÓN------------

    createProduct: async (req, res) => {
        try {
            const { name, description, image, category, price, size } = req.body;
            const newProduct = await ProductModel.create({ name, description, image, category, size, price });
            res.redirect('/dashboard');
        } catch (error) {
            console.error("Error while creating product:", error);
            res.status(500).json({ error: "Error while creating product" });
        }
    },

showDashboardHtml: async (req, res) => {
    try {
        const products = await ProductModel.find();
        const dashboardHtml = generateDashboardHtml(products);
        res.send(dashboardHtml);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error while loading dashboard");
    }
},
    //formulario d emodificación de producto
    showNewProductForm: (req, res) => {
        const html = template(`
            <h1>Crear nuevo producto</h1>
            <form action="/dashboard" method="POST">

              <label>Nombre:</label>
              <input type="text" name="name" required />

              <label>Descripción:</label>
              <textarea name="description" required></textarea>

              <label>Imagen (URL):</label>
              <input tupe="text" name="image" required />

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
            </form>
            `);
        res.send(html);
    },

    showEditProductForm: async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).send("Producto no encontrado");
            }
            const html = template(`
                <h1>Editar producto</h1>
                <form action="/dashboard/${productId}/edit" method="POST">
                    <input type="hidden" name="_method" value="PUT" />
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
                </form>`);
        res.send(html);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error while loading edit form");
        }
    },

    updateProduct: async (req, res) => {
        try {
            const id = req.params.productId;
            const { name, description, image, category, price, size } = req.body;
            const updatedProduct = await ProductModel.findByIdAndUpdate(id, { name, description, image, category, price, size }, { new: true });
            res.json({ data: updatedProduct, message: "Product updated successfully" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error while updating product" });
            }
    },

    deleteProduct: async (req, res) => {
    try {
        const { productId } = req.params;

        const deletedProduct = await ProductModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).send("Producto no encontrado");
        }

        res.redirect('/dashboard');

    } catch (error) {
        console.error(error);
        res.status(500).send("Error while deleting product");
    }
},


}

module.exports = productController