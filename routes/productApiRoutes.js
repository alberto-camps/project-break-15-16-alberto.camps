const express = require('express');
const router = express.Router();
const productApiController = require('../controllers/productApiController');
const upload = require('../middlewares/upload');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas para la API de productos

// Mostrar todos los productos
router.get('/products', productApiController.showProducts);

// Mostrar producto por ID
router.get('/products/:productId', productApiController.showProductById);

// Crear un producto
router.post('/dashboard', authMiddleware, upload.single('image'), productApiController.createProduct);

// Actualizar un producto
router.put('/dashboard/:productId', authMiddleware, upload.single('image'), productApiController.updateProduct);

// Eliminar un producto
router.delete('/dashboard/:productId/delete', authMiddleware, productApiController.deleteProduct)

module.exports = router;