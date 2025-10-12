const mongoose = require('mongoose');
// Función asincrona (espera respuesta) que establece la conexión con la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connectado a MongoDB");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

// Se exporta la función para poder usarla en otros ficheros
module.exports = connectDB;