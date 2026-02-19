/**
 * productController.js
 * Controlador de productos: CRUD y gestión de productos
 */

const { error } = require("node:console")
const ProductModel = require("../models/Product")
const template = require('../helpers/template');
const home = require('../helpers/home');
const getProductCards = require('../helpers/getProductCards');
const generateDashboardHtml = require('../helpers/dashboardHtml');
const cloudinary = require("../config/cloudinary");
const productDetailView = require("../helpers/productView");
const productViewDashboard = require("../helpers/productViewDashboard");
const newProductForm = require('../helpers/newProductForm');
const editProductForm = require('../helpers/editProductForm');

const productController = {

    // ------------TIENDA PÚBLICA------------

    showHome:(req, res) => {
        const html = home(req);
        res.send(html);
    },

    // JSON
    // Obtener productos en formato JSON para la API
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
            res.json({data:productsWithLinks, message:"Products obtained successfully"})
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


    // HTML
    //Convertir datos a HTML para que devuelva la web
    showProductsHtml: async (req, res) => {
        try {
           const { category} =req.query;

           let products;

           if(category) {
            products = await ProductModel.find({category});
           }else{
            products= await ProductModel.find();
           }

           const cardsHtml = getProductCards(products);
           const html = template(cardsHtml, req);
           res.send(html);
           
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
                return res.status(404).send('Product not found');
            }

            const html = productDetailView(product, req);

            res.send(html);
        }catch(error){
            console.error(error);
            res.status(500).send('Error while loading product details');
        }
    },



    // ------------DASHBOARD DE ADMINISTRACIÓN------------

    // Mostrar lista de productos en el dashboard
    showDashboardHtml: async (req, res) => {
        try {
            const products = await ProductModel.find();
            const dashboardHtml = generateDashboardHtml(products);
            const html = template(dashboardHtml, req);
            res.send(html);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error while loading dashboard");
        }
    },

    // Mostrar detalle de producto en el dashboard
    showDasboardProductById: async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).send("Producto no encontrado");
            }   
            const html = productViewDashboard(product, req);
            res.send(html);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error while loading product details");
        }
    },

    // Crear nuevo producto en el dashboard
    createProduct: async (req, res) => {
        try {
         console.log("BODY:", req.body);
         console.log("FILE:", req.file);

            const { name, description, category, price, size } = req.body;
            const result = await cloudinary.uploader.upload(req.file.path);//subir img a cloudinary

            const newProduct = await ProductModel.create({ 
                name, 
                description, 
                image: result.secure_url, 
                category, 
                size, 
                price: Number(price) 
            });
            res.redirect('/dashboard');
        } catch (error) {
            console.error("Error while creating product:", error);
            res.status(500).json({ error: "Error while creating product" });
        }
    },

    // Mostrar formulario de creación de producto
    showNewProductForm: (req, res) => {
        try {
            const html = newProductForm(null, req);
            res.send(html);
         } catch (error) {
            console.error(error);
            res.status(500).send("Error while loading new product form");
        }   
    },
 
    // Mostrar formulario para actualizar un producto existente 
    showEditProductForm: async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).send("Producto no encontrado");
            }
            const html = editProductForm(product, req);
            res.send(html);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error while loading edit form");
        }
    },
    
    // Actualizar producto en el dashboard
    updateProduct: async (req, res) => {
        try {
            const id = req.params.productId;
            const { name, description, image, category, price, size } = req.body;
            const updatedProduct = await ProductModel.findByIdAndUpdate(id, { name, description, image, category, price, size }, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.redirect(`/dashboard/${updatedProduct._id}`);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error while updating product" });
            }
    },

    // Eliminar producto del dashboard
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

// Delete API
deleteProductApi: async (req, res) => {
        try {
            const id = req.params.productId;
            const deletedProduct = await ProductModel.findByIdAndDelete(id);
            res.json({ data: deletedProduct, message: "Product deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error while deleting product" });
        }
    }
};

module.exports = productController;