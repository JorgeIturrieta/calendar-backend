
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Crear el servidor de express
const app = express();
// Conexión con la base de datos
dbConnection();
// CORS 
app.use(cors()) ;
// Directorio Público
app.use(express.static('public'));
// Lectura y parseo del body
app.use(express.json());
// Rutas
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));
// Escuchar peticiones del servidor
app.listen(process.env.PORT,()=> console.log( `Servidor corriendo en el puerto ${process.env.PORT}`));
