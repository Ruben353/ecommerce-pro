const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://admin:admin@ecomdb.muforju.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ecomdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('Servidor backend conectado a MongoDB 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
