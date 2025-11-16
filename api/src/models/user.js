const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Se requiere el nombre']
    },
    username: {
        type: String,
        unique: [true, 'Ese nombre de usuario ya existe'],
        required: [true, 'Se require un nombre de usuario']
    },
    apellidos: {
        type: String,
        required: [true, 'Se require los apellidos']
    },
    email: {
        type: String,
        required: [true, 'Se requiere email'],
        unique: [true, 'El correo ya existe'],
        match: [/.+\@.+\..+/, 'El correo no es válido']
        // . --> Cualquier caracter
        // + --> Pueden haber varios carácteres
        // @ --> Validar que haya @
        // . --> Cualquier caracter
        // \. --> Representa el .
        //  .+ --> que pueden haber más caracteres
    },
    telefono: {
        type: Number,
        unique: [true, 'El número de teléfono ya existe'],
        required: [true, 'Se requiere numero de telefono'],
        match: [/^\d{9}$/, 'El número de teléfono debe tener 9 dígitos']
    },
    contraseña: {
        type: String,
        required: [true, 'Se require contraseña'],
        minlength: 8,
        maxlength: 100 // Max length a 100, porque al hashear la contraseña será mas larga
    },
    rol: {
        type: String,
        enum: ['registrado', 'admin'],
        default: 'registrado'
    },
    bann: {
        type: Boolean,
        required: [true, 'Se requiere saber si el usuario esta banneado'],
        default: false
    },
    modificacion: {
        type: Date,
        required: false
    },
    // Direcciones (Relacion Embebida(que aunque sea N:N el numero de direcciones no sera infinito))
     direcciones: [{
        calle: String,
        numero_piso: String,
        codigo_postal: String,
        ciudad: String,
        provincia: String,
        pais: { type: String, default: 'España' },
        activa: { type: Boolean, default: false }
    }],
    // MÉTODOS DE PAGO EMBEBIDOS
    metodos_pago: [{
        tipo_metodo: {
            type: String,
            enum: ['PayPal', 'Visa', 'Mastercard', 'Bizum']
        },
        token: String,
        activo: Boolean,
        fecha_creacion: { 
            type: Date, 
            default: Date.now 
        }
    }],
    // Puntos embebidos
    puntos: {
        puntos_acumulados: { type: Number, default: 0 },
        actualizacion_puntos: Date
    },
    // Productos favoritos (al final son limitados al num de prods que hay en la tienda)
    favoritos: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
});

/*
    el schema.pre es un middleware de mongoose que se ejecuta antes de guardar un document en la BD.
    En este caso se hashea la contraseña antes de guardar el documento.
    
    Cada vez que se hace referencia al this, se esta apuntando al documento que queremos guardar.
    El primer if, se encarga de que si la contraseña no se ha vuelto a modificar, se evita volerla a hashear, a traves de 
    devoler next que lo que hace es continuar en este caso con el save.

    En el caso de que se pase el if, se creara el salt y a continuación se hasheara la contraseña.
    Por último, se hace next para continuar con el proceso de el save.
*/
userSchema.pre('save', async function(next) {
    if(!this.isModified('contraseña')) return next();
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
});



// userSchema.index({ email: 1 });

const user = mongoose.model('user', userSchema);

module.exports = user;