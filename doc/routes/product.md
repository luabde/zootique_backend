# Rutas de Productos (`/api/products`)

Documentación de los endpoints relacionados con la gestión de productos en la API de **Zootique**.

---

## POST `/api/products`

### Descripción
Crea un nuevo producto en la base de datos.



## Flujo de la petición

Cuando se hace un POST a `/api/products`, el flujo de ejecución es:

1. **Route** (`productRoutes.js`):  
   Captura la petición HTTP y llama al controlador de producto.

2. **Controller** (`productController.js`):  
   Recibe `req.body`, valida datos y llama al **Service** y espera la respuesta.

3. **Service** (`productService.js`):  
   Crea una instancia del modelo `Product` y llama a `.save()`.

4. **Model** (`product.js` / Mongoose):  
   Define la estructura del producto y se comunica con la base de datos usando la conexión abierta en `index.js`.
