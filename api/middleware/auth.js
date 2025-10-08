const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authencateToken = async (req, res, next) => {
    const authHeader = req.header['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).json({error: 'Token de acesso requerido'})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' })
        }

        req.user = user
        next()     //segue para o conteudo autenticado
    }catch (error) {
        return res.status(403).json({ error: 'Token inválido' })
    }
}

const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin'){
        return res.status(403).json({ error: 'Acesso negado. Requer permissão de administrador.'})
    }
    next()
}