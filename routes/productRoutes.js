/**
 * productRoutes.js
 * Rutas de productos: CRUD y operaciones relacionadas
 */

const express = require("express");
const productController = require("../controllers/productController")
const router  =  express.Router();


// ------------TIENDA PÚBLICA (HTML)------------


//home de la tienda lista
router.get('/', productController.showProductsHtml);

//detalle de oroducto(HTML)
router.get('/products/:productId', productController.showProductDetailHtml);

// Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.

//devuelve API (JSON)
router.get('/api/products', productController.showProducts);
// Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.  
router.get('/api/products/:productId', productController.showProductById);


// Devuelve el detalle de un producto.
// En el dashboard aparecerán todos los artículos que se hayan subido.



    // ------------DASHBOARD DE ADMINISTRACIÓN------------ 

//API
router.get('/dashboard', productController.showDashboardHtml);

router.get('/dashboard/new', productController.showNewProductForm);

router.post('/dashboard', productController.createProduct);//Crea un nuevo producto
router.put('/dashboard/:productId', productController.updateProduct);//Actualiza un producto
router.post('/dashboard/:productId/delete', productController.deleteProduct);//elimina un producto

/*
// Devuelve el dashboard del administrador    
router.get('/dashboard', productController.showDashboard);

// Devuelve el formulario para subir un artículo nuevo
    router.get('/dashboard/new', productController.showNewProduct)

// Devuelve el detalle de un producto en el dashboard.
    router.get('/dashboard/:productId', productController.showDashboardProductById)

// Devuelve el formulario para editar un producto.
    router.get('/dashboard/:productId/edit', productController.showEditProduct) 

    */


module.exports = router;
