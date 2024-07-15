import mysql from 'mysql2/promise' 
import mysqlConnection from '../dbconection/dbconection.js'

const usersMysql = {
    postUsuarios: async (user) => {
        let conn = undefined
        try {
            let cfg = mysqlConnection.getConection()
            conn = await mysql.createConnection(cfg)
            const [resp] = await conn.query('INSERT INTO Usuarios SET ?', user)
            await conn.end()
            user.Id = resp.insertId
            return user
        } catch (error) {
            if (conn) await conn.end()
            throw(error)
        }
    },
    getUsuariosMsql: async () => {
        let conn = undefined
        try {
            let cfg = mysqlConnection.getConection()
            conn = await mysql.createConnection(cfg)
            const [resp] = await conn.query("SELECT * FROM Usuarios")
            await conn.end()
            return resp
        } catch (error) {
            if (conn) await conn.end()
            throw(error)
        }
    },
    getUsuarioById: async(usuarioId) => {
        let conn = undefined
        try {
            let cfg = mysqlConnection.getConection()
            conn = await mysql.createConnection(cfg)
            let sql = `select * from Usuarios where Id = ${usuarioId}`
            const [resp] = await conn.query(sql)
            await conn.end()
            return resp
        } catch (error) {
            if (conn) await conn.end()
            throw(error)
        }
    },
    putUsuariosMsql: async(usuario) => {
        let conn = undefined
        try {
            let cfg = mysqlConnection.getConection()
            conn = await mysql.createConnection(cfg)
            let sql = `UPDATE Usuarios SET ? WHERE Id = ?`
            const [resp] = await conn.query(sql, [usuario, usuario.Id])
            await conn.end()
            return resp
            
        } catch (error) {
            if (conn) await conn.end()
            throw(error)
        }
    },
    deleteUsuarioById: async(usuarioId) => {
        let conn = undefined
        try {
            let cfg = mysqlConnection.getConection()
            conn = await mysql.createConnection(cfg)
            let sql = `DELETE FROM Usuarios WHERE Id= ${usuarioId}`
            const [resp] = await conn.query(sql)
            await conn.end()
            return resp
        } catch (error) {
            if (conn) await conn.end()
            throw(error)
        }
    },
}



export default usersMysql