const swaggerJSDoc = require('swagger-jsdoc');
const options = {
    definition: {
            openapi: "3.0.0",
            info: {
                title: "Zootique Api",
                version: "1.0.0",
                description: "Tienda online de productos de mascotas, donde los usuarios podran ver los productos, añadirlos al carrito y realizar compras."
            },
            servers: [
                {
                    url: "http://localhost:3000"
                }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT"
                    }
                },
                schemas: {
                    ObjectId: {
                        type: "string",
                        description: "Identificador tipo MongoDB ObjectId",
                        pattern: "^[a-fA-F0-9]{24}$"
                    },
                    ErrorResponse: {
                        type: "object",
                        required: ["status", "message"],
                        properties: {
                            status: { type: "string", example: "error" },
                            message: { type: "string", example: "No autorizado" }
                        }
                    },
                    ApiResponse: {
                        type: "object",
                        properties: {
                            status: { type: "string", example: "success" },
                            message: { type: "string" },
                            data: { type: "object" }
                        }
                    },
                    
                    // AUTH
                    RegisterRequest: {
                        type: "object",
                        required: ["nombre", "username", "apellidos", "email", "telefono", "contraseña"],
                        properties: {
                            nombre: { type: "string" },
                            username: { type: "string" },
                            apellidos: { type: "string" },
                            email: { type: "string" },
                            telefono: { type: "number" },
                            contraseña: { type: "string" }
                        }
                    },
                    LoginRequest: {
                        type: "object",
                        required: ["email", "contraseña"],
                        properties: {
                            email: { type: "string" },
                            contraseña: { type: "string" }
                        }
                    },
                    
                    // USER
                    Direccion: {
                        type: "object",
                        properties: {
                            calle: { type: "string" },
                            numero_piso: { type: "string" },
                            codigo_postal: { type: "string" },
                            ciudad: { type: "string" },
                            provincia: { type: "string" }
                        }
                    },
                    MetodoPago: {
                        type: "object",
                        properties: {
                            tipo_metodo: { type: "string" },
                            token: { type: "string" },
                            activo: { type: "boolean" },
                            fecha_creacion: { type: "string" }
                        }
                    },
                    Puntos: {
                        type: "object",
                        properties: {
                            puntos_acumulados: { type: "number", default: 0 },
                            actualizacion_puntos: { type: "string" }
                        }
                    },
                    User: {
                        type: "object",
                        properties: {
                            _id: { $ref: "#/components/schemas/ObjectId" },
                            nombre: { type: "string" },
                            username: { type: "string" },
                            apellidos: { type: "string" },
                            email: { type: "string" },
                            rol: { type: "string" }
                        }
                    },
                    
                    // PRODUCT
                    Product: {
                        type: "object",
                        properties: {
                            _id: { $ref: "#/components/schemas/ObjectId" },
                            nombre: { type: "string" },
                            descripcion: { type: "string" },
                            precio: { type: "number" },
                            tipo: { type: "string" },
                            animales: {
                                type: "array",
                                items: { type: "string" }
                            },
                            stock: { type: "number" },
                            url: { type: "string" }
                        }
                    },
                    ProductCreateRequest: {
                        type: "object",
                        required: ["nombre", "precio", "tipo", "stock"],
                        properties: {
                            nombre: { type: "string" },
                            descripcion: { type: "string" },
                            precio: { type: "number" },
                            tipo: { type: "string" },
                            animales: {
                                type: "array",
                                items: { type: "string" }
                            },
                            stock: { type: "number" },
                            url: { type: "string" }
                        }
                    },
                    ProductUpdateRequest: {
                        allOf: [{ $ref: "#/components/schemas/ProductCreateRequest" }],
                        description: "Actualización parcial o completa del producto"
                    },
                    
                    // DISCOUNT
                    Discount: {
                        type: "object",
                        properties: {
                            _id: { $ref: "#/components/schemas/ObjectId" },
                            dto: { type: "number" },
                            inicio_descuento: { type: "string" },
                            fin_descuento: { type: "string" },
                            activo: { type: "boolean" }
                        }
                    },
                    DiscountCreateRequest: {
                        type: "object",
                        required: ["dto", "inicio_descuento", "fin_descuento"],
                        properties: {
                            dto: { type: "number" },
                            inicio_descuento: { type: "string" },
                            fin_descuento: { type: "string" },
                            activo: { type: "boolean" }
                        }
                    },
                    DiscountUpdateRequest: {
                        allOf: [{ $ref: "#/components/schemas/DiscountCreateRequest" }]
                    },
                    
                    // ORDER
                    DescuentoAplicado: {
                        type: "object",
                        properties: {
                            nombre: { type: "string" },
                            tipo: { type: "string" },
                            valor: { type: "number" }
                        }
                    },
                    OrderItemRequest: {
                        type: "object",
                        required: ["id", "cantidad"],
                        properties: {
                            id: { $ref: "#/components/schemas/ObjectId" },
                            cantidad: { type: "number", minimum: 1 },
                            descuentos_aplicados: {
                                type: "array",
                                items: { $ref: "#/components/schemas/DescuentoAplicado" }
                            }
                        }
                    },
                    OrderCreateRequest: {
                        type: "object",
                        required: ["product_data", "direction_id"],
                        properties: {
                            product_data: {
                                type: "array",
                                items: { $ref: "#/components/schemas/OrderItemRequest" },
                                description: "Productos a comprar"
                            },
                            direction_id: { $ref: "#/components/schemas/ObjectId" },
                            metodo_pago_id: { $ref: "#/components/schemas/ObjectId", nullable: true },
                            estado: {
                                type: "string",
                                description: "Estado del pedido"
                            },
                            fecha_fin: { type: "string" }
                        }
                    },
                    OrderItemSnapshot: {
                        type: "object",
                        properties: {
                            product_id: { $ref: "#/components/schemas/ObjectId" },
                            nombre: { type: "string" },
                            precio: { type: "number" },
                            cantidad: { type: "number" },
                            tipo: { type: "string" },
                            descuentos_aplicados: { type: "array", items: { $ref: "#/components/schemas/DescuentoAplicado" } },
                            precio_total: { type: "number" }
                        }
                    },
                    Order: {
                        type: "object",
                        properties: {
                            _id: { $ref: "#/components/schemas/ObjectId" },
                            user_id: { $ref: "#/components/schemas/ObjectId" },
                            items: { type: "array", items: { $ref: "#/components/schemas/OrderItemSnapshot" } },
                            direccion_envio_id: { $ref: "#/components/schemas/ObjectId" },
                            metodo_pago_id: { $ref: "#/components/schemas/ObjectId", nullable: true },
                            estado: { type: "string" },
                            subtotal: { type: "number" },
                            fecha_pedido: { type: "string" },
                            fecha_entrega: { type: "string", nullable: true }
                        }
                    },
                    
                    // CART
                    CartItem: {
                        type: "object",
                        properties: {
                            product_id: { $ref: "#/components/schemas/ObjectId" },
                            cant_producto: { type: "number" },
                            precio_total: { type: "number" }
                        }
                    },
                    CartAddItemRequest: {
                        type: "object",
                        required: ["productId", "cantidad"],
                        properties: {
                            productId: { $ref: "#/components/schemas/ObjectId" },
                            cantidad: { type: "number", minimum: 1 }
                        }
                    },
                    CartUpdateItemRequest: {
                        type: "object",
                        required: ["cantidad"],
                        properties: {
                            cantidad: { type: "number", minimum: 1 }
                        }
                    },
                    Cart: {
                        type: "object",
                        properties: {
                            _id: { $ref: "#/components/schemas/ObjectId" },
                            user_id: { $ref: "#/components/schemas/ObjectId" },
                            items: { type: "array", items: { $ref: "#/components/schemas/CartItem" } },
                            precio_total_prods: { type: "number" },
                            cantidad_total_prods: { type: "number" }
                        }
                    },
                    
                    // OTROS ASOCIADOS A USER
                    DireccionRequest: {
                        type: "object",
                        required: ["calle", "numero_piso", "codigo_postal", "ciudad", "provincia"],
                        properties: {
                            calle: { type: "string" },
                            numero_piso: { type: "string" },
                            codigo_postal: { type: "string" },
                            ciudad: { type: "string" },
                            provincia: { type: "string" }
                        }
                    },
                    MetodoPagoRequest: {
                        type: "object",
                        required: ["tipo_metodo", "token"],
                        properties: {
                            tipo_metodo: { type: "string" },
                            token: { type: "string" },
                            activo: { type: "boolean" }
                        }
                    },
                    PuntosChangeRequest: {
                        type: "object",
                        required: ["cantidad"],
                        properties: {
                            cantidad: { type: "number" }
                        }
                    },
                    EstadoPedidoUpdateRequest: {
                        type: "object",
                        required: ["estado"],
                        properties: {
                            estado: { type: "string" }
                        }
                    }
                }
            },

            security: [
                {
                    bearerAuth: []
                }
            ]

    },
    apis: ["./src/routes/*.js"]
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;