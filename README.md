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

//#Bonus:


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


