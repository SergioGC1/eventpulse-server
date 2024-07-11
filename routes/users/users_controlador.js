import express from 'express';
import { body, param, validationResult } from 'express-validator';
import usersMysql from './users_mysql.js'; // Asegúrate de que la extensión .js es correcta y el archivo existe.
const router = express.Router();

const reglasUsuario = [
    body('email').notEmpty().isEmail()
];

const reglasUsuarioId = [
    param('id').notEmpty()
];

const reglasUsuarioPut = [
    body('Id').notEmpty()
];

// Usamos async para poder usar en su interior instrucciones tipo await.
router.post('/', reglasUsuario, async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
            return;
        }
        let usuario = req.body;
        usuario = await usersMysql.postUsuarios(usuario);
        res.json(usuario);     
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        let usuarios = await usersMysql.getUsuariosMsql();
        res.status(200).json(usuarios); // Se puede poner 200 o no. Por defecto es 200
    } catch (error) {
        next(error);
    }
});

router.get('/:id', reglasUsuarioId, async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
            return;
        }
        let usuarios = await usersMysql.getUsuarioById(req.params.id);
        if (usuarios.length === 0) {
            // No hay usuario
            res.status(404).send(`El usuario con id ${req.params.id} no existe en la base de datos`);
            return;
        }
        res.json(usuarios[0]); 
    } catch (error) {
        next(error);
    }
});

router.put('/', reglasUsuarioPut, async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
            return;
        }
        let usuario = req.body;
        await usersMysql.putUsuariosMsql(usuario);
        res.json(usuario);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', reglasUsuarioId, async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
            return;
        }
        let usuario = await usersMysql.deleteUsuarioById(req.params.id);
        res.json(usuario);
    } catch (error) {
        next(error);
    }
});

export default router;
