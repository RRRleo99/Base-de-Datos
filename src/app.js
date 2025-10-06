import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

// Routers
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Motor de vistas
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas API
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Vista principal
app.get('/', (req, res) => {
  res.render('products', { title: 'Productos' });
});

// Conexión a MongoDB Atlas (DB: coderhouse)
mongoose.connect('mongodb+srv://leonelrivero:leoleoleobd@cluster0.pdrx1je.mongodb.net/coderhouse?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error);
  });

// Servidor
const PORT = 3031;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});