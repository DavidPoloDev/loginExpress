const connection = require('./connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const login = async (req, res) => {
console.log('Query params:', req.query);
const datos = req.query;

try {
// Primero, buscar al usuario por correo electrónico
const [results] = await connection.query(
    "SELECT * FROM `usuarios` WHERE `correo_electronico` = ?",
    [datos.correo_electronico]
);

// Si existe el usuario, verificar la contraseña
if (results.length > 0) {
    // Verificar si la contraseña está hasheada con bcrypt
    if (results[0].contraseña.startsWith('$2b$') || results[0].contraseña.startsWith('$2a$')) {
    // Contraseña con bcrypt
    if (bcrypt.compareSync(datos.contraseña, results[0].contraseña)) {
        req.session.correo_electronico = datos.correo_electronico;
        return res.status(200).send({
        success: true,
        message: "Ingreso Exitoso",
        user: {
            id: results[0].id,
            correo_electronico: results[0].correo_electronico
        }
        });
    }
    } else {
    // Contraseña con método anterior (por compatibilidad)
    // Nota: Esto es para mantener compatibilidad con contraseñas antiguas
    // En un sistema real, deberías migrar todas las contraseñas a bcrypt
    const oldHash = require('md5')(datos.contraseña);
    if (oldHash === results[0].contraseña) {
        req.session.correo_electronico = datos.correo_electronico;
        return res.status(200).send({
        success: true,
        message: "Ingreso Exitoso",
        user: {
            id: results[0].id,
            correo_electronico: results[0].correo_electronico
        }
        });
    }
    }
}

// Si llegamos aquí, las credenciales son incorrectas
res.status(401).send({
    success: false,
    message: "Usuario o Contraseña Incorrecto",
    error: "Las credenciales proporcionadas no coinciden con ningún usuario"
});

} catch (err) {
console.log(err);
res.status(500).send({
    success: false,
    message: "Error en el servidor",
    error: err.message
});
}
}

module.exports = login