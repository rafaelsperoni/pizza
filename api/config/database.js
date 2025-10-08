const mysql = require('mysql2/promise')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const initilizeDatabase = async () =>{
    try{
        const connection = await pool.getConnection()

        //tabela usuarios
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                papel ENUM('admin', 'user') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )            
            `)
        //tabela tipos
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS tipos_pizza (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                descricao TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `)

        //tabela pizzas
        await connection.execute(`
        CREATE TABLE IF NOT EXISTS pizzas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            descricao TEXT,
            preco DECIMAL(10,2) NOT NULL,
            ingredientes TEXT NOT NULL,
            tipo_id INT NOT NULL,
            disponivel BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tipo_id) REFERENCES tipos_pizza(id) ON DELETE RESTRICT
        )
        `)   
    
        connection.release()
        console.log('Base de dados inicializada com sucesso!')
    }catch(error){
        console.error('Erro na inicialização da base de dados')
    }
} 

module.exports = {pool, initilizeDatabase}