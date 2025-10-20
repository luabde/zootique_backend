# Rutas de Productos (`/api/products`)

Documentación de los endpoints relacionados con la gestión de productos en la API de **Zootique**.

---

## POST `/api/products`

### Descripción
Crea un nuevo producto en la base de datos.



### Flujo de la petición

Cuando se hace un POST a `/api/products`, el flujo de ejecución es:

1. **Route** (`productRoutes.js`):  
   Captura la petición HTTP y llama al controlador de producto.

2. **Controller** (`productController.js`):  
   Recibe `req.body`, valida datos y llama al **Service** y espera la respuesta.

3. **Service** (`productService.js`):  
   Crea una instancia del modelo `Product` y llama a `.save()`.

4. **Model** (`product.js` / Mongoose):  
   Define la estructura del producto y se comunica con la base de datos usando la conexión abierta en `index.js`.

## GET `/api/products`

### Descripción
Obtiene todos los productos de la base de datos.

### Flujo de la petición
1. **Route** GET /api/products → readProducts

2. **Controller** Llama a productService.readProducts()

3. **Service** Ejecuta Product.find() para devolver todos los productos

4. **Model** Mongoose devuelve un array con todos los documentos de la colección products.

## GET `/api/products:id`

### Descripción
Obtiene un producto específico por su ID

### Flujo de la petición
1. **Route** GET /api/products/:id → readProductById

2. **Controller** Extrae req.params.id, llama al service y maneja errores (404 si no existe)

3. **Service** Ejecuta Product.findById(id)

4. **Model** devuelve el producto correspondiente o null si no existe.

## PUT `/api/products/:id`

### Descripción
Actualiza un producto existente por su ID.

### Flujo de la petición
1. **Route** PUT /api/products/:id → updateProduct

2. **Controller** Recibe req.body y req.params.id, llama al service y maneja errores (404 si no existe)

3. **Service** Ejecuta Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

4. **Model** Mongoose actualiza el documento y devuelve el producto actualizado.

## DELETE `/api/products/:id`

### Descripción
Elimina un producto de la base de datos por su ID.

### Flujo de la petición
1. **Route** DELETE /api/products/:id → deleteProduct

2. **Controller**Extrae req.params.id, llama al service y maneja errores (404 si no existe)

3. **Service** Ejecuta Product.findByIdAndDelete(id)

4. **Model** Mongoose elimina el documento de la colección products.