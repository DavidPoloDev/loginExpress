const connection = require("./connection");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = async (req, res) => {
// No necesitamos verificar si hay sesión para el registro
const datos = req.query;

try {
const hash = bcrypt.hashSync(datos.contraseña, saltRounds)
// Comprobar si el usuario ya existe
const [existingUser] = await connection.query(
"SELECT * FROM `usuarios` WHERE `correo_electronico` = ?",
[datos.correo_electronico, hash]
);

if (existingUser.length > 0) {
return res.status(400).send({
    success: false,
    message: "El correo electrónico ya está registrado",
    error: "Este correo ya está en uso"
});
}

// Hashear la contraseña con bcrypt
const hashedPassword = bcrypt.hashSync(datos.contraseña, saltRounds);

// Insertar usuario en la base de datos
const [results] = await connection.query(
"INSERT INTO `usuarios` (`id`, `correo_electronico`, `contraseña`) VALUES (NULL, ?, ?);",
[datos.correo_electronico, hashedPassword]
);

if (results.affectedRows > 0) {
// No crear sesión en el registro, solo enviar respuesta exitosa
res.status(200).send({
    success: true,
    message: "Registro Exitoso",
    user: {
    id: results.insertId,
    correo_electronico: datos.correo_electronico
    }
});
} else {
res.status(500).send({
    success: false,
    message: "No se pudo registrar",
    error: "Problemas al intentar registrarse"
});
}
} catch (err) {
console.log(err);
res.status(500).send({
success: false,
message: "Error en el servidor",
error: err.message
});
}
}
module.exports = register