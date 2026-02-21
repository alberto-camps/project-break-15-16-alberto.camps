# PROJECT BREAK 2 - TIENDA DE ROPA

Proyecto de tienda online que incluye catálogo público de productos y un dashboard de administración privado protegido mediante sesión con credenciales.


#Funcionalidades:

1. Catálogo público:

Visualizar un catálogo de productos.
Consultar el detalle de cada producto.

2. Dashboard de administración:
Acceso a dashboard privado mediante sesión.
Crear, editar y eliminar productos.
Subir imágenes utilizando Cloudinary.

3. API(Bonus Obligatorio):
Exponer una API en formato JSON para consumo externo.


#Organización del proyecto:

/config: conexión a base de datos.
/controllers: lógica de negocio.
/models: definición de esquemas (Mongoose).
/routes: definición de endpoints.
/middlewares: protección de rutas.
/helpers: generación de vistas (SSR).
/public: archivos estáticos (CSS).
/index.js: punto de entrada del servidor.

Esta organización nos permite separar lógica, rutas, vistas y configuración.

#Autenticación:
El acceso al dashboard está protegido mediante sesión (express-session).Las credenciales del administrador se definen en el archivo .env.



//#Bonus extra:
1. Documentación de la API(Swagger)

La API está documentada con Swagger, esto permite visualizar y probar los endpoints directamente desde el navegador. Se visualizarán en: http://localhost:3001/api-docs/.

2. Testing:
Se han implementado tests para comprobar el correcto funcionamiento del controlador.

Se ha utilizado:
-Jest para pruebas unitarias.
-Supertest para testear endpoints HTTP.

Los tests validan operaciones CRUD y respuestas de la API.

3. Autenticación:
El acceso al dashboard está protegido mediante sesión con login (express-session).Las credenciales del administrador se definen en el archivo .env.



#Instalación:
1. Clonar repositorio.
2. Instalar dependencias.
3. Crear archivo .env con las variables necesarias:
MONGO_URI=
PORT=
SESSION_SECRET=
ADMIN_USER=
ADMIN_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
4. Ejecutar.



//#Despliegue:

La aplicación está desplegada en Render, es necesario configurar en producción las mismas variables de entorno indicadas anteriormente.

La base de datos está alojada en MongoDB Atlas y requiere tener habilitado el acceso de red (0.0.0.0/0).


-->USO DE LA APLICACIÓN<--

-La página principal muestra las categorías de productos.
-Al acceder a una categoría se visualizan los artículos correspondientes.
-Cada producto dispone de una vista de detalle.

-Para acceder al panel de administración:
1. Ir a /login.
2. Introducir las credenciales definidas en el archivo .env.
3. Desde el dashboard se pueden crear, editar y eliminar productos.