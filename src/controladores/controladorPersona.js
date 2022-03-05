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
    console.log(req.body);
    if (!req.body.correo || !req.body.clave)
        return res.json({
            status: false,
            mensaje: 'usuario y contraseña son requeridos'

        })

    try {
        const persona = await ModeloPersoan.findOne({ correo: req.body.correo });
        console.log(persona);
        if (persona && persona.clave === req.body.clave) {
            return res.json({
                status: true,
                mensaje: 'successful',
                usuario: persona

            })
        }
        res.json({
            status: false,
            mensaje: 'usuario o contraseña incorrecto'

        })

    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            mensaje: 'error en el servidor'

        })
    }
}