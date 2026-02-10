/**
 * productController.js
 * Controlador de productos: CRUD y gestión de productos
 */

const { error } = require("node:console")
const ProductModel = require("../models/Product")

const productController = {

    // -----------Solo se han creado el get y post para probar que todo funciona-----------

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
            res.status(201).json(newProduct);
        } catch (error) {
            console.error("Error while creating product:", error);
            res.status(500).json({ error: "Error while creating product" });
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
            const id = req.params.productId;
            const deletedProduct = await ProductModel.findByIdAndDelete(id);
            res.json({ data: deletedProduct, message: "Product deleted successfully" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error while deleting product" });
        }
    }
}

module.exports = productController