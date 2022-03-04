const ModeloPersoan = require("../modelos/ModeloPersoan")

exports.crearNuevoUsuario = async (req, res) => {

    try {
        const nuevaPersona = new ModeloPersoan(req.body);
        await nuevaPersona.save();
        res.json({
            status: true,
            mensaje: 'usuario creado',
            usuario: nuevaPersona

        })
    } catch (error) {
        res.json({
            status: false,
            mensaje: 'error en el servidor'

        })
    }
}


exports.login = async (req, res) => {

    try {
        const persona = ModeloPersoan.findOne({ correo: req.correo });
        if (persona && persona.clave === req.clave) {
            return res.json({
                status: true,
                mensaje: 'usuario creado',
                usuario: nuevaPersona

            })
        }
        res.json({
            status: false,
            mensaje: 'usuario o contraseña incorrecto'

        })

    } catch (error) {
        res.json({
            status: false,
            mensaje: 'error en el servidor'

        })
    }
}