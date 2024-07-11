import express from 'express';
import {body, param, validationResult} from 'express-validator'
import usersMysql from './users_mysql'

var router = express.Router();

let reglasUsuario = [
    body('email').notEmpty().isEmail()
]

let reglasUsuarioId = [
    param('id').notEmpty()
]

let reglasUsuarioPut = [
    body('usuarioId').notEmpty()
]
//usamos async para poder usar en su interior instrucciones tipo wait.
router.post('/', reglasUsuario, async (req, res, next) => {
    try {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() })
            return 
        }
        let usuario = req.body
        usuario = await usersMysql.postUsuarios(usuario)
        res.json(usuario);     
    } catch (error) {
        next(error)
    }

});

router.get('/', async (req, res, next) => {
    try {
        let usuarios = await usersMysql.getUsuariosMsql();
        res.status(200).json(usuarios); // se puede poner 200 o no. Por defecto es 200
    } catch (error) {
        next(error)
    }
})

router.get('/:id', reglasUsuarioId, async (req, res, next) => {
    try {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() })
            return 
        }
        let usuarios = await usersMysql.getUsuarioById(req.params.id);
        if (usuarios.length == 0) {
            // No hay usuario
            res.status(404).send(`El usario con id ${req.params.id} no exixte en la base de datos`)
            return
        }
        res.json(usuarios[0]); 
    } catch (error) {
        next(error)
    }
})

router.put('/', reglasUsuarioPut, async (req, res, next) => {
    try {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() })
            return 
        }
        let usuario = req.body;
        await usersMysql.putUsuariosMsql(usuario)
        res.json(usuario);   
    } catch (error) {
        next(error)
    }

});


router.delete('/:id', reglasUsuarioId, async (req, res, next) => {
    try {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() })
            return 
        }
        let usuario = await usuariosMysql.deleteUsuarioById(req.params.id);
        // res.json({ mensaje: "Usuario eliminado con éxito", usuario }); 
        res.json(usuario);
    } catch (error) {
        next(error)
    }
})

export default router;