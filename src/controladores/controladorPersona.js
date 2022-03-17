const ModeloPersoan = require("../modelos/ModeloPersoan")

//metodo crea una nueva persona y la guarda en la base de datos
exports.crearNuevoUsuario = async (req, res) => {

    try {
        const nuevaPersona = new ModeloPersoan(req.body); //crea un modelo con los datos enviado de la persona
        await nuevaPersona.save(); // gurada los datos en la base de datos

        //envia una respuesta con el usuario creado
        res.json({
            status: true,
            mensaje: 'usuario creado',
            usuario: nuevaPersona

        })
    } catch (error) {
        //envia una respuesta si hay algun error
        res.json({
            status: false,
            mensaje: 'error en el servidor'

        })
    }
}

//metodo para login usuado correo y contraseña
exports.login = async (req, res) => {
    if (!req.body.correo || !req.body.clave)
        return res.json({
            status: false,
            mensaje: 'usuario y contraseña son requeridos'

        })

    try {
        //busca los datos filtrando por correo
        const persona = await ModeloPersoan.findOne({ correo: req.body.correo });
        //compara la contraseña, si es igual envia los datos del usuario
        if (persona && persona.clave === req.body.clave) {
            return res.json({
                status: true,
                mensaje: 'successful',
                usuario: persona

            })
        }
        //si el usuario o l acontraseña es incorrecta envia esta respuesta
        res.json({
            status: false,
            mensaje: 'usuario o contraseña incorrecto'

        })

    } catch (error) {
        //envia una respuesta si hay un error
        res.json({
            status: false,
            mensaje: 'error en el servidor'

        })
    }
}