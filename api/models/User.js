const { pool } = require('../config/database')
const bcrypt = require('bcryptjs')

class User{
    static async create(userData){
        const { nome, email, senha, papel = 'user'} = userData
        const hashedPassword = await bcrypt.hash(senha, 10)

        const [result] = await pool.execute(
            'INSERT INTO users (nome, email, senha, papel) VALUES (?,?,?,?)',
            [nome, email, hashedPassword, papel]
        )

        return result.insertId
    }

    static async findByEmail(email){
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )
        return rows[0]
    }

    static async findById(id){
        const [rows] = await pool.execute(
            'SELECT id, nome, email, papel, created_at FROM users WHERE id = ?',
            [id]
        )
        return rows[0]
    }

    static async comparePassword(plainPassword, hashedPassword){
        return await bcrypt.compare(plainPassword, hashedPassword)
    }
    
}

module.exports = User