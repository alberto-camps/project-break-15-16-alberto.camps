/**
 * BONUS
 * authRoutes.js
 * Rutas de autenticación: login, registro y logout
 */

const express = require("express");
const authController = require('../controllers/authController');
const router = express.Router();

// ------Rutas de autenticación------

// Formulario de login
router.get('/login', authController.showLoginForm);

// Procesar login
router.post('/login', authController.login);

// Logout
router.get('/logout', authController.logout);

module.exports = router;

