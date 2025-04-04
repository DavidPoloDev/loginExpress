const validate = (req, res) => {
console.log("Sesión actual:", req.session);
if (req.session.correo_electronico) {
    // Si existe correo_electronico en la sesión, el usuario está autenticado
    res.status(200).send({
    success: true,
    message: 'Sesion validada',
    user: {
        correo_electronico: req.session.correo_electronico
    },
    session: {
        active: true,
        created: req.session.cookie.originalMaxAge 
        ? new Date(Date.now() - (req.session.cookie.maxAge - req.session.cookie.originalMaxAge))
        : new Date(),
        expires: req.session.cookie.expires || new Date(Date.now() + req.session.cookie.maxAge)
    }
    });
} else {
    res.status(401).send({
    success: false,
    message:"No autorizado",
    error: 'No hay una sesión activa'
    });
}
}

module.exports = validate