const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const register = async (req, res) => {
    try{
        const { nome, email, senha } = req.body

        const existingUser = await User.findByEmail(email)
        if (existingUser){
            return res.status(400).json({ error: 'Email já cadastrado' })
        }

        //criação do usuario
        const userId = await User.create({ nome, email, password })

        const token = generateToken(userId)

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            token,
            user: {
                id: userId,
                nome,
                email
            }
        })
    }catch(error){
        console.error('Erro ao registrar: ', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
    }
}

const login = async (req, res) => {
    try{
        const { email, senha } = req.body

        const user = await User.findByEmail(email)
        if (!user){
            return res.status(401).json({ error: 'Credenciais inválidas' })
        }

        //gerar token
        const token = generateToken(user.id)

        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                papel: user.papel
            }
        })
    }catch(error){
        console.error('Erro de login: ', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
    }
}

const getProfile = async (req, res) => {
    res.json({
        user: req.user
    })
}

module.exports = { register, login, getProfile }