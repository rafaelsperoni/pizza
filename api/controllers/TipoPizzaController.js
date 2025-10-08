const TipoPizza = require('../models/TipoPizza')

const getAllTipos = async (req, res) => {
    try{
        const tiposPizza = await TipoPizza.findAll()
        res.json(tiposPizza)
    }catch(error){
        console.error('Erro na busca por pizzas: ', error)
        res.status(500).json({ error: 'Erro interno de servidor' })
    }
}

const getTipoPizzaById = async (req, res) => {
    try {
        const { id } = req.params
        const tipoPizza = await TipoPizza.findById(id)

        if (!tipoPizza){
            return res.status(404).json({ error: 'Tipo de pizza não encontrado' })
        }

        res.json(tipoPizza)
    } catch (error) {
        console.error('Erro ao recuperar tipo de pizza:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const createTipoPizza = async (req, res) => {
    try {
        const { nome, descricao } = req.body
        const tipoPizzaId = await TipoPizza.create({ nome, descricao })

        res.status(201).json({
            message: 'Tipo de pizza criado com sucesso',
            id: tipoPizzaId
        })
    } catch (error) {
        console.error('Erro ao criar tipo de pizza:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });       
    }
}

const updateTipoPizza = async (req, res) => {
    try {
        const { id } = req.params
        const { nome, descricao } = req.body

        const updated = await TipoPizza.update(id, { nome, descricao })

        if (!updated){
            return res.status(404).json({ error: 'Tipo de pizza não encontrado' })
        }

        res.json({ message: 'Tipo de pizza atualizado com sucesso' })
    }catch(error){
        console.error('Erro ao atualizar tipo de pizza:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });          
    }
}

const deleteTipoPizza = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await TipoPizza.delete(id)

        if (!deleted){
            return res.status(404).json({ error: 'Tipo de pizza não encontrado' })
        }

    } catch (error) {
        console.error('Erro ao apagar tipo de pizza:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });  
    }
}

module.exports = {
    getAllTipos,
    getTipoPizzaById,
    createTipoPizza,
    updateTipoPizza,
    deleteTipoPizza
}