// Carrega variables de entorno
require('dotenv').config();

// Carga express i el de la base de dades (importa funcion que se encarga de hcer la conexion a la bd)
const express = require('express')
const connectDB = require('./config/db.js')
const cookieParser = require('cookie-parser');

const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const discountRouter = require('./routes/discountRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');
const cartRouter = require('./routes/cartRoutes.js');

// Inicializamos express
const app = express();

// Instalar cors primero: npm install cors
const cors = require('cors');

// Después de inicializar express y antes de las rutas
app.use(cors({
  origin: 'http://localhost:5173', // Puerto donde corre Vite
  credentials: true
}));


app.use(express.json());

// Se usa cookie parser, para poder acceder a las cookies desde nuestra API
app.use(cookieParser());

// Se connecta a la bd
connectDB();

// Crea la ruta raiz donde se inicializa la aplicación
app.get('/', (req, res) => res.send('API Ecommerce en marcha'));

// Cuando se haga la llamada a la url /api/products se redirige a productRoutes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/discounts', discountRouter);
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);


const PORT = process.env.PORT|3000;

// Inicializa el express, es decir genera un listener que escucha peticiones por el puerto definido anteriormente
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));