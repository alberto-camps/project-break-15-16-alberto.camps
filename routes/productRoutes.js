/**
 * productRoutes.js
 * Rutas de productos: CRUD y operaciones relacionadas
 */

const express = require("express");
const productController = require("../controllers/productController")
const router  =  express.Router();


// ------------TIENDA PÚBLICA------------

// Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
    router.get('/products', productController.showProducts)
    router.get('/', productController.showProductsHTML);//para ver la tienda en el navegador

// Devuelve el detalle de un producto.
// En el dashboard aparecerán todos los artículos que se hayan subido.
// Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.  
    router.get('/products/:productId', productController.showProductById)

    // ------------DASHBOARD DE ADMINISTRACIÓN------------ 
    
/*
// Devuelve el dashboard del administrador    
    router.get('/dashboard', productController.showDashboard)

// Devuelve el formulario para subir un artículo nuevo
    router.get('/dashboard/new', productController.showNewProduct)
*/

// Crea un nuevo producto.
    router.post('/dashboard', productController.createProduct)
/*

// Devuelve el detalle de un producto en el dashboard.
    router.get('/dashboard/:productId', productController.showDashboardProductById)

// Devuelve el formulario para editar un producto.
    router.get('/dashboard/:productId/edit', productController.showEditProduct) 

    */
// Actualiza un producto.
    router.put('/dashboard/:productId', productController.updateProduct)

// Elimina un producto.
    router.delete('/dashboard/:productId/delete', productController.deleteProduct)


module.exports = router;
