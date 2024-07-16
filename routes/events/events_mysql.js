import mysql from 'mysql2/promise' 
import mysqlConnection from '../dbconection/dbconection.js'

const eventsMysql = {
    postEvents: async (event) => {
        let conn = undefined
        try{
            let cfg = mysqlConnection.getConection()
            conn = await mysql.createConnection(cfg)
            const [resp] = await conn.query('INSERT INTO Eventos SET ?', event)
            await conn.end()
            event.Id = resp.insertId
            return event
        } catch (error) {
            if (conn) await conn.end()
            throw(error)
        }
    },
    getEvents: async () => {
        let conn = undefined
        try {
            let cfg = mysqlConnection.getConection()
            conn = await mysql.createConnection(cfg)
            const [resp] = await conn.query("SELECT * FROM Eventos")
            await conn.end()
            return resp
        } catch (error) {
            if (conn) await conn.end()
            throw(error)
        }
    },
    getEventById: async (eventId) => {
        let conn = undefined
        try {
            let cfg = mysqlConnection.getConection()
            conn = await mysql.createConnection(cfg)
            let sql = `SELECT * FROM Eventos WHERE idEvento = ${eventId}`
            const [resp] = await conn.query(sql)
            await conn.end()
            return resp
        } catch (error) {
            if (conn) await conn.end()
            throw(error)
        }
    },
    deleteEventById: async (eventId) => {
        let conn = undefined
        try {
            let cfg = mysqlConnection.getConection()
            conn = await mysql.createConnection(cfg)
            let sql = `DELETE FROM Eventos WHERE idEvento = ${eventId}`
            const [resp] = await conn.query(sql)
            await conn.end()
            return resp
        } catch (error) {
            if (conn) await conn.end()
            throw(error)
        }
    },
    putEventById: async (eventId, event) => {
        let conn = undefined
        try {
            let cfg = mysqlConnection.getConection()
            conn = await mysql.createConnection(cfg)
            let sql = `UPDATE Eventos SET ? WHERE idEvento = ${eventId}`
            const [resp] = await conn.query(sql, event)
            await conn.end()
            return resp
        } catch (error) {
            if (conn) await conn.end()
            throw(error)
        }
    }
}

export default eventsMysql