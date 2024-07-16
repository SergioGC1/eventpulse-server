import eventsMysql from './events_mysql.js';
import express from 'express';
import { body, validationResult } from 'express-validator'

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let  evento = req.body
        evento = await eventsMysql.postEvents(evento);
        return res.json(evento);
    } catch (error) {
        console.error(error);
        next(error)
    }
});

router.get("/", async (req, res) => {
    try {
        let events = await eventsMysql.getEvents();
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
            return;
        }
        let eventos = await eventsMysql.getEventById(req.params.id);
        if (eventos.length === 0) {
            res.status(404).send(`El evento con id ${req.params.id} no existe en la base de datos`);
            return;
        }
        res.json(eventos[0]); 
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
            return;
        }
        let eventos = await eventsMysql.deleteEventById(req.params.id);
        if (eventos.length === 0) {
            res.status(404).send(`El evento con id ${req.params.id} no existe en la base de datos`);
            return;
        }
        res.json(eventos[0]); 
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
            return;
        }
        let evento = req.body;
        evento = await eventsMysql.putEventById(req.params.id, evento);
        res.json(evento);
    } catch (error) {
        next(error);
    }
});


export default router;