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
    }
}

export default eventsMysql