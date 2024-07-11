import loginMysql from "./login_mysql.js";
import express from 'express';
import { body, validationResult } from 'express-validator'


var router = express.Router();

const loginValidationRules = [
    body('Email').notEmpty(),
    body('Password').notEmpty(),
];

// Ruta para la autenticación de usuarios
router.post("/", loginValidationRules, async (req, res) => {
    try {
        // Valida los errores de la solicitud
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Si hay errores, devuelve un mensaje de error con los detalles
            return res.status(400).json({ errors: errors.array() });
        }
        // Obtiene el usuario y la contraseña del cuerpo de la solicitud
        const { Email, Password } = req.body;
        // Intenta iniciar sesión con las credenciales proporcionadas
        const user = await loginMysql.postLogin(Email, Password);
        if (user) {
            // Si el inicio de sesión tiene éxito, devuelve los datos del usuaruio
            return res.json(user);
        } else {
            // Si las credenciales son incorrectas, devuelve un mensaje de error
            return res.status(401).json( 'Incorrect email or password' );
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;