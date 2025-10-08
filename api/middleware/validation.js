const validaTipoPizza = (req, res, next) => {
    const { nome } = req.body

    if (!nome || nome.trim() === '' ){
        return res.status(400).json({ error: 'Nome de tipo é obrigatório'})
    }
    next()
}

const validaPizza = (req, res, next) => {
    const { nome, preco, ingredientes, tipo_id } = req.body
    if (!nome || nome.trim() === ''){
        return res.status(400).json({ error: 'Nome de pizza é obrigatório'})
    }

    if (!preco || preco <0){
        return res.status(400).json({ error: 'Preço da pizza deve ser maior que zero'})
    }

    if (!ingredientes || ingredientes.trim() === ''){
        return res.status(400).json({ error: 'Ingredientes são obrigatórios'})
    }

    if (!tipo_id){
        return res.status(400).json({ error: 'Tipo de pizza é obrigatório'})
    }

    next()

}

module.exports = { validaPizza, validaTipoPizza }