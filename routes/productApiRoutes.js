const express = require('express');
const router = express.Router();
const productApiController = require('../controllers/productApiController');
const upload = require('../middlewares/upload');
const authController = require('../controllers/authController')
const authApiMiddleware = require('../middlewares/authApiMiddleware');

// Rutas para la API de productos

// Mostrar todos los productos
router.get('/products', productApiController.showProducts);

// Mostrar producto por ID
router.get('/products/:productId', productApiController.showProductById);

// Login API
router.post('/login', authController.loginApi)

// Crear un producto
router.post('/dashboard', authApiMiddleware, upload.single('image'), productApiController.createProduct);

// Actualizar un producto
router.put('/dashboard/:productId', authApiMiddleware, upload.single('image'), productApiController.updateProduct);

// Eliminar un producto
router.delete('/dashboard/:productId/delete', authApiMiddleware, productApiController.deleteProduct)

module.exports = router;