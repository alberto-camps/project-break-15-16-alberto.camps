const ProductModel = require('../models/Product');

const productApiController = {
    // Obtener productos en formato JSON para la API
    showProducts: async (req,res) => {
        try {
            const products = await ProductModel.find()
            res.json({data:products, message:"Products obtained successfully"})
        } catch (error) {
            console.error("Error while fetching products:", error)
            res.status(500).json({ error: "Error while fetching products" });
        }
    },

    // Obtener detalle de producto en formato JSON para la API
        showProductById: async (req,res) => {
            try {
                const id = req.params.productId
                const product = await ProductModel.findById(id)
                if (!product) {
                    return res.status(404).json({ error: "Product not found" });
                }
                res.json({data:product, message:"Product obtained successfully"})
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error while fetching product details" });
            }
        },

        // Crear un nuevo producto a través de la API
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

        // Actualizar un producto existente a través de la API
        updateProduct: async (req, res) => {
            try {
                const id = req.params.productId;
                const { name, description, price } = req.body;
                const image = req.file?.path;
                const updatedProduct = await ProductModel.findByIdAndUpdate(
                    id,
                    { name, description, price, image },
                    { new: true }
                );
                if (!updatedProduct) {
                    return res.status(404).json({ error: 'Producto no encontrado' });
                }
                res.json(updatedProduct);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error al actualizar producto' });
            }
        },

        // Eliminar un producto a través de la API
        deleteProduct: async (req, res) => {
            try {
                const id = req.params.productId;
                const deletedProduct = await ProductModel.findByIdAndDelete(id);
                if (!deletedProduct) {
                    return res.status(404).json({ error: 'Producto no encontrado' });
                }
                res.json({ message: 'Producto eliminado exitosamente' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error al eliminar producto' });
            }
        }
    };

module.exports = productApiController;