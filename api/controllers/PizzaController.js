const Pizza = require('../models/Pizza')

const getAllPizzas = async (req, res) => {
    try{
        const pizzas = await Pizza.findAll()
        res.json(pizzas)
    }catch(error){
        console.error('Erro na busca por pizzas: ', error)
        res.status(500).json({ error: 'Erro interno de servidor' })
    }
}

const getPizzaById = async (req, res) => {
    try {
        const { id } = req.params
        const pizza = await Pizza.findById(id)

        if (!pizza){
            return res.status(404).json({ error: 'Pizza não encontrada' })
        }

        res.json(pizza)
    } catch (error) {
        console.error('Erro ao recuperar pizza:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const getPizzasByType = async (req, res) => {
    try {
        const { id } = req.params
        const pizzas = await Pizza.findByType(id)

        if (!pizzas){
            return res.status(404).json({ error: 'Pizzas não encontradas' })
        }

        res.json(pizzas)
    } catch (error) {
        console.error('Erro ao recuperar pizzas por tipo:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}


const createPizza = async (req, res) => {
    try {
        const { nome, descricao, preco, ingredientes, tipo_id } = req.body
        const pizzaId = await Pizza.create({ nome, descricao, preco, ingredientes, tipo_id })

        res.status(201).json({
            message: 'Pizza criada com sucesso',
            id: pizzaId
        })
    } catch (error) {
        console.error('Erro ao criar pizza:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });       
    }
}

const updatePizza = async (req, res) => {
    try {
        const { id } = req.params
        const { nome, descricao, preco, ingredientes, tipo_id, dipsonivel } = req.body

        const updated = await Pizza.update(id, { nome, descricao, preco, ingredientes, tipo_id, dipsonivel })

        if (!updated){
            return res.status(404).json({ error: 'Pizza não encontrada' })
        }

        res.json({ message: 'Pizza atualizada com sucesso' })
    }catch(error){
        console.error('Erro ao atualizar pizza:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });          
    }
}

const deletePizza = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await Pizza.delete(id)

        if (!deleted){
            return res.status(404).json({ error: 'Pizza não encontrada' })
        }

    } catch (error) {
        console.error('Erro ao apagar pizza:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });  
    }
}

module.exports = {
    getAllPizzas,
    getPizzaById,
    getPizzasByType,
    createPizza,
    updatePizza,
    deletePizza
}