// Carrega variables de entorno
require('dotenv').config();

// Carga express i el de la base de dades (importa funcion que se encarga de hcer la conexion a la bd)
const express = require('express')
const connectDB = require('./config/db.js')


// Inicializamos express
const app = express();


app.use(express.json());

// Se connecta a la bd
connectDB();

// Crea la ruta raiz donde se inicializa la aplicación
app.get('/', (req, res) => res.send('API Ecommerce en marcha'));



const PORT = process.env.PORT|3000;

// Inicializa el express, es decir genera un listener que escucha peticiones por el puerto definido anteriormente
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));