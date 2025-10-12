# Zootique - Backend

Tienda online de productos de mascotas, donde los usuarios podran ver los productos, añadirlos al carrito y realizar compras.

---

## Tecnologías
- Lenguajes: Nodejs
- Base de datos: mongoDB

## Software
- [Node][https://nodejs.org/es/]
- [Git][https://git-scm.com/]
- [Docker][https://www.docker.com/]
- [Visual Studio][https://code.visualstudio.com/]
- [postman][https://www.postman.com/downloads/]

## Instalación
A continuación se muestran los pasos para configurar el entorno del proyecto **Node.js** con **Express** y **Mongoose**:

```bash
# 1. Entrar a la carpeta del proyecto
cd api

# 2. Inicializar un nuevo proyecto Node.js con un archivo package.json por defecto
npm init -y

# 3. Instalar dependencias principales:
# - express: Framework para crear el servidor HTTP y manejar rutas.
# - mongoose: Librería para conectarse y trabajar con MongoDB.
# - dotenv: Permite manejar variables de entorno desde un archivo .env
npm install express mongoose dotenv

# 4. Instalar dependencias de desarrollo:
# - nodemon: Reinicia automáticamente el servidor cuando detecta cambios en el código.
npm install --save-dev nodemon