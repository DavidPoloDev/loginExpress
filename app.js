const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const session = require('express-session')
const bcrypt = require('bcryptjs');
const login = require('./login');
const register = require('./register');
const { TogetUsuarios, deleteUsuarios } = require('./usuarios');
const validate = require('./validate');
const saltRounds = 10;
mysql://root:VNCiZrVdnODdmkarfsivymMPzDcxpqdr@nozomi.proxy.rlwy.net:41401/railway

// Configuración de CORS para permitir peticiones desde el frontend
app.use(cors({
origin: process.env.URLFRONTEND || 'http://localhost:3001',  // Origen permitido para las peticiones
credentials: true // Permite el envío de cookies en peticiones cross-origin
}))

// Configuración de sesiones
app.use(session({
secret: process.env.SECRETSESSION ||'habhcbvhbhdvb',
proxy: process.env.NODE_ENV === 'production',
resave: false,
saveUninitialized: false, // Clave secreta para firmar la cookie de sesión
cookie: {secure: process.env.NODE_ENV === 'production',
  sameSite: 'none',
  maxAge: 24 * 60 * 60 * 1000 // 24 horas
}
}))

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Ruta para la autenticación de usuarios
app.get('/login',login)

// Ruta para validar si hay una sesión activa
app.get('/validate', validate)

// Ruta para registrar Usuarios
app.get('/register', register)

// Ruta para obtener usuarios
app.get('/usuarios', TogetUsuarios)

// Ruta para eliminar usuarios
app.delete('/usuarios', deleteUsuarios);

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
// Destruir la sesión
req.session.destroy(err => {
  if (err) {
    console.error("Error al cerrar sesión:", err);
    return res.status(500).send("Error al cerrar sesión");
  }
  
  // Respuesta exitosa
  res.status(200).send({
    success: true,
    message: "Sesión finalizada correctamente"
  });
});
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});