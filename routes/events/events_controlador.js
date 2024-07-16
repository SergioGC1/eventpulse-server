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

export default router;