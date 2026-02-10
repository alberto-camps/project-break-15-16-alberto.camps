/**
 * productController.js
 * Controlador de productos: CRUD y gestión de productos
 */

const ProductModel = require("../models/Product")

const productController = {

    // -----------Solo se han creado el get y post para probar que todo funciona-----------

    // ------------TIENDA PÚBLICA------------
    getProducts: async (req,res) => {
        try {
            const products = await ProductModel.find()
            res.json({data:products, message:"Productos obtenidos correctamente"})
        } catch (error) {
            console.error("Error al obtener productos:", error)
            res.status(500).send("Error al obtener productos")
        }
    },

    createProduct: async (req, res) => {
        try {
            const { name, description, image, category, price, size } = req.body;
            const newProduct = await ProductModel.create({ name, description, image, category, size, price });
            res.status(201).json(newProduct);
        } catch (error) {
            console.error("Error while creating product:", error);
            res.status(500).json({ error: "Error while creating product" });
        }
    }
}

module.exports = productController