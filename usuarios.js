const connection = require("./connection");

const TogetUsuarios = async (req, res) => {

try {
  const [results] = await connection.query("SELECT * FROM `usuarios`");
  res.status(200).json(results);
} catch (err) {
  console.log(err);
  res.status(500).send({
    success: false,
    message: "Error en el servidor",
    error: err.message
  });
}
}



const deleteUsuarios =async (req, res) => {
// CORREGIDO: Solo los usuarios autenticados pueden eliminar usuarios
if (!req.session.correo_electronico) {
    res.status(401).send("No autorizado");
    return;
}

const datos = req.query;

try {
    // Eliminar el usuario
    const [deleteResult] = await connection.query(
    "DELETE FROM usuarios WHERE `usuarios`.`id` = ?",
    [datos.id]
    );

    if (deleteResult.affectedRows > 0) {
    // Si se eliminó correctamente, obtener la lista actualizada de usuarios
    const [updatedUsers] = await connection.query("SELECT * FROM `usuarios`");
    
    // Enviar la lista actualizada como respuesta
    res.status(200).json(updatedUsers);
    } else {
    res.status(404).send({
        success: false,
        message: "No se pudo eliminar",
        error: "Usuario no encontrado"
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
module.exports = {TogetUsuarios, deleteUsuarios}