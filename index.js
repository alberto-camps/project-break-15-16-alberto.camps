/**
 * index.js
 * Punto de entrada de la aplicación
 * Inicializa servidor, middlewares y rutas
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const { dbConnection } = require('./config/db');
const routes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const productApiRoutes = require('./routes/productApiRoutes');

const mongo_uri = process.env.MONGO_URI;
const methodOverride = require('method-override');
const session = require('express-session');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc')


// Middlewares  
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


// Rutas de productos, autenticación y APIs
app.use('/', routes);
app.use('/', authRoutes);
app.use('/api', productApiRoutes);

const swaggerOptions = {
    definition:{
        openapi: '3.0.0',
        info: {
            title: 'API Tienda',
            version: '1.0.0',
            description: 'Documentación API de la tienda'
        },
        servers: [
            {
                url: 'http://localhost:3001'
            }
        ]
    },
    apis:['./routes/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.use((req, res) => {
    res.status(404).send('Page not found');
});


dbConnection(mongo_uri);
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
