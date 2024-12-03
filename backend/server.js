import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Carga las variables de entorno

const app = express();

// Middleware
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite manejar JSON en las requests

// Variables de entorno
const PORT = process.env.PORT || 5000;

// Rutas básicas
app.get('/', (req, res) => {
  res.send('Bienvenido al backend de CloneSlack');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
