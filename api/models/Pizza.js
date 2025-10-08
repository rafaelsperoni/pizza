const { pool } = require('../config/database');

class Pizza {
  static async findAll() {
    const [rows] = await pool.execute(`
      SELECT p.*, pt.nome as nome_tipo, pt.descricao as tipo_descricao 
      FROM pizzas p 
      INNER JOIN tipos_pizza pt ON p.tipo_id = pt.id
    `);
    return rows;
  }
  
  static async findById(id) {
    const [rows] = await pool.execute(`
      SELECT p.*, pt.nome as nome_tipo, pt.descricao as tipo_descricao 
      FROM pizzas p 
      INNER JOIN tipos_pizza pt ON p.tipo_id = pt.id 
      WHERE p.id = ?
    `, [id]);
    return rows[0];
  }
  
  static async findByType(pizzaTypeId) {
    const [rows] = await pool.execute(`
      SELECT p.*, pt.nome as nome_tipo 
      FROM pizzas p 
      INNER JOIN tipos_pizza pt ON p.tipo_id = pt.id 
      WHERE p.tipo_id = ?
    `, [pizzaTypeId]);
    return rows;
  }
  
  static async create(pizzaData) {
    const { nome, descricao, preco, ingredientes, tipo_id } = pizzaData;
    const [result] = await pool.execute(
      'INSERT INTO pizzas (nome, descricao, preco, ingredientes, tipo_id) VALUES (?, ?, ?, ?, ?)',
      [nome, descricao, preco, ingredientes, tipo_id]
    );
    return result.insertId;
  }
  
  static async update(id, pizzaData) {
    const { nome, descricao, preco, ingredientes, tipo_id, disponivel } = pizzaData;
    const [result] = await pool.execute(
      'UPDATE pizzas SET nome = ?, descricao = ?, preco = ?, ingredientes = ?, tipo_id = ?, disponivel = ? WHERE id = ?',
      [nome, descricao, preco, ingredientes, tipo_id, disponivel, id]
    );
    return result.affectedRows > 0;
  }
  
  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM pizzas WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Pizza;