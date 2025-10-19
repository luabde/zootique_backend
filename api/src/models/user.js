import mongoose from "mongoose";
const { Schema } = mongoose;

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
        min: 9,
        max: 9
    },
    contraseña: {
        type: String,
        required: [true, 'Se require contraseña'],
        minlength: 8,
        maxlength: 25
    },
    rol: {
        type: String,
        enum: ['registrado', 'noReggistrado', 'admin'],
        default: 'noRegistrado'
    },
    bann: {
        type: Boolean,
        required: [true, 'Se requiere saber si el usuario esta banneado'],
        default: false
    },
    modificacion: {
        type: Date,
        required: false
    }

});

userSchema.index({ email: 1 });

const user = mongoose.model('user', userSchema);

module.exports = user;