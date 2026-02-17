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
const mongo_uri = process.env.MONGO_URI;
const methodOverride = require('method-override');





/* Swagger
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')
*/

/* COMPROBAR QUE EXPRESS ARRANCA
app.get("/",(req,res)=>{
    res.send("hello world");
    })
    */
   
   
   
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());
   
   
   /* app.use('/dashboard', authMiddleware, authRoutes); */
app.use('/', routes);
   
dbConnection(mongo_uri);
   
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
   
   
   /* Endpoint Swagger
   app.use('/', swaggerUI.serve,swaggerUI.setup(docs))
   */
  
  /* prueba de subida iamgenes cloudinary
  const cloudinary = require ('./config/cloudinary');
  
  const testSubida = async() => {
    try {
        const result = await cloudinary.uploader.upload('./camisetaGrisClaro.jpg');
        
        console.log("subida OK");
        console.log(result.secure_url);
        } catch (error) {
            console.log("ERROR");
            console.log(error);
            }
            };
            
            testSubida(); */