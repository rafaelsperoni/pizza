const { pool } = require('../config/database');

class TipoPizza {
  static async findAll() {
    const [rows] = await pool.execute(`
      SELECT pt.*, COUNT(p.id) as pizza_count 
      FROM tipos_pizza pt 
      LEFT JOIN pizzas p ON pt.id = p.tipo_id 
      GROUP BY pt.id
    `);
    return rows;
  }
  
  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM tipos_pizza WHERE id = ?',
      [id]
    );
    return rows[0];
  }
  
  static async create(pizzaTypeData) {
    const { name, description } = pizzaTypeData;
    const [result] = await pool.execute(
      'INSERT INTO tipos_pizza (nome, descricao) VALUES (?, ?)',
      [nome, descricao]
    );
    return result.insertId;
  }
  
  static async update(id, pizzaTypeData) {
    const { name, description } = pizzaTypeData;
    const [result] = await pool.execute(
      'UPDATE tipos_pizza SET nome = ?, descricao = ? WHERE id = ?',
      [nome, descricao, id]
    );
    return result.affectedRows > 0;
  }
  
  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM tipos_pizza WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = TipoPizza;