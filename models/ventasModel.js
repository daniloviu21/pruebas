const pool = require('../config/db');

class Ventas {
    static async create(precioTotal) {
        const result = await pool.query('INSERT INTO ventas (precioTotal) VALUES ($1) RETURNING *',[precioTotal]);
        return result.rows[0];
    }
}

module.exports = Ventas;
