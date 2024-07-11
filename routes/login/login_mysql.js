import mysql from 'mysql2/promise' 
import mysqlConnection from '../dbconection/dbconection.js'

const loginMysql = {
    postLogin: async (email, password) => {
        let conn = undefined
        try {
            let cfg = mysqlConnection.getConection()
            conn = await mysql.createConnection(cfg)
            let sql = "SELECT * FROM Usuarios WHERE Email = ? AND Password = ?"
            const [resp] = await conn.query( sql, [email, password]);
            if (resp.length == 0) return null //if user doesnt exist
            let user = resp[0]
            await conn.end()
            return user // devolvemos el usuario
            
        } catch (error) {
            if (conn) await conn.end()
            throw(error)
        }
    },
}

export default loginMysql;
