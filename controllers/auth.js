const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJTW } = require('../helpers/jwt');

// requerimos response de express para obtener IntelliSense
const createUser = async (req, res = response) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                message: "Ya existe un usuario con ese correo",
            })
        } else {
            user = new User(req.body);
            // Encriptar contraseña
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(password, salt);
            // Gauardar datos del usuario en la base de datos
            await user.save();
            // Generar json web token
            const token = await generateJTW(user.id, user.name);

            return res.status(201).json({
                ok: true,
                uid: user.id,
                name: user.name,
                email: user.email,
                token
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hubo un problema al crear el usuario. Contante con el administrador'
        })
    }

}

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: "Usuario o contraseña incorrecto",
            })
        } else {
            // Confirmar las contraseñas
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    message: "Usuario o contraseña incorrecto",
                })
            }
            // Generar json web token
            const token = await generateJTW(user.id, user.name);

            return res.json({
                ok: true,
                uid: user.id,
                name: user.name,
                token,
            })
        }


    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Hubo un problema. Contante con el administrador',
        })
    }


}
const revalidateToken = async (req, res = response) => {
    const { uid, name } = req;

    // Generar un nuevo JWT y retornarlo en esta peticion 
    const token = await generateJTW(uid, name);
    res.json({
        ok: true,
        token,
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}