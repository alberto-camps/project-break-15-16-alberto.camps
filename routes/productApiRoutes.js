const express = require('express');
const router = express.Router();
const productApiController = require('../controllers/productApiController');
const upload = require('../middlewares/upload');
const authController = require('../controllers/authController')
const authApiMiddleware = require('../middlewares/authApiMiddleware');

// Rutas para la API de productos

// Mostrar todos los productos
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 */
router.get('/products', productApiController.showProducts);

// Mostrar producto por ID
/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Obtener un producto por ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.get('/products/:productId', productApiController.showProductById);

// Login API
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login de administrador
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Login correcto
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', authController.loginApi)

// Crear un producto
/**
 * @swagger
 * /api/dashboard:
 *   post:
 *     summary: Crear un producto (Solo administrador)
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Producto creado correctamente
 *       403:
 *         description: Acceso no autorizado
 */
router.post('/dashboard', authApiMiddleware, upload.single('image'), productApiController.createProduct);

// Actualizar un producto
/**
 * @swagger
 * /api/dashboard/{productId}:
 *   put:
 *     summary: Actualizar un producto (Solo administrador)
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
router.put('/dashboard/:productId', authApiMiddleware, upload.single('image'), productApiController.updateProduct);

// Eliminar un producto
/**
 * @swagger
 * /api/dashboard/{productId}/delete:
 *   delete:
 *     summary: Eliminar un producto (Solo administrador)
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/dashboard/:productId/delete', authApiMiddleware, productApiController.deleteProduct)

module.exports = router;