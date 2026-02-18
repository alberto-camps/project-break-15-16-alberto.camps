/**
 * productRoutes.js
 * Rutas de productos: CRUD y operaciones relacionadas
 */

const express = require("express");
const productController = require("../controllers/productController")
const router  =  express.Router();
const upload = require('../middlewares/upload');
const authMiddleware = require('../middlewares/authMiddleware');



// ------------TIENDA PÚBLICA------------

// Home / listado de productos (HTML)
router.get(['/products', '/'], productController.showProductsHtml);

// Detalle de producto (HTML)
router.get('/products/:productId', productController.showProductDetailHtml);

// Listado de productos (JSON)
router.get('/api/products', productController.showProducts);

// Detalle de producto (JSON)  
router.get('/api/products/:productId', productController.showProductById);




// ------------DASHBOARD DE ADMINISTRACIÓN------------ 

//dashboard de administración (HTML)
router.get('/dashboard', authMiddleware, productController.showDashboardHtml);

// Formulario para crear nuevo producto (HTML)
router.get('/dashboard/new', authMiddleware, productController.showNewProductForm); 

// Crear nuevo producto, con subida de imagen desde Cloudinary (HTML)
router.post('/dashboard', upload.single('image'), authMiddleware, productController.createProduct);

// Formulario para editar producto existente (HTML)
router.get('/dashboard/:productId/edit', authMiddleware, productController.showEditProductForm);

// Actualizar producto existente (HTML)
router.put('/dashboard/:productId', authMiddleware, productController.updateProduct);

// Muestrar el detalle de un producto en el dashboard (HTML)
router.get('/dashboard/:productId', authMiddleware, productController.showDasboardProductById);

// Eliminar un producto (HTML)
router.post('/dashboard/:productId/delete', authMiddleware, productController.deleteProduct);


module.exports = router;
