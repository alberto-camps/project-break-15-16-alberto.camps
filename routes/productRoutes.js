/**
 * productRoutes.js
 * Rutas de productos: CRUD y operaciones relacionadas
 */

const express = require("express");
const productController = require("../controllers/productController")
const router  =  express.Router();
const upload = require('../middlewares/upload');



// ------------TIENDA PÚBLICA (HTML)------------


//home de la tienda lista
router.get(['/products', '/'], productController.showProductsHtml);

//detalle de producto(HTML)
router.get('/products/:productId', productController.showProductDetailHtml);

// Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.

//devuelve API (JSON)
router.get('/api/products', productController.showProducts);
// Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.  
router.get('/api/products/:productId', productController.showProductById);




    // ------------DASHBOARD DE ADMINISTRACIÓN------------ 

//API
router.get('/dashboard', productController.showDashboardHtml);

router.get('/dashboard/new', productController.showNewProductForm); // Formulario para crear nuevo producto
router.post('/dashboard', upload.single('image'), productController.createProduct);//Crea un nuevo producto

router.get('/dashboard/:productId/edit', productController.showEditProductForm);//Muestra el formulario para editar un producto
router.put('/dashboard/:productId', productController.updateProduct);//Actualiza un producto

router.get('/dashboard/:productId', productController.showDasboardProductById);//Muestra el detalle de un producto en el dashboard


router.post('/dashboard/:productId/delete', productController.deleteProduct);//elimina un producto

//login y seguridad
router.get('/login', productController.showLoginForm);
router.post('/login', productController.login);
router.get('/logout', productController.logout);


module.exports = router;
