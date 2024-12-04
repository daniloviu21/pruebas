const pool = require('../config/db');

class Marcas {

    static async obtenerMarcas(){
        const result = await pool.query('SELECT * FROM marcas');
        return result.rows;
    }

    static async create(data){
        const {nombreMarca} = data;
        const result = await pool.query('INSERT INTO marcas (nombreMarca) VALUES ($1) RETURNING *',[nombreMarca]);
        return result.rows[0];
    }

    static async update(id, data){
        const {nombreMarca} = data;
        const result = await pool.query('UPDATE marcas SET nombreMarca = $1, updated_at = now() WHERE id = $2 and deleted_at is null RETURNING *', [nombreMarca, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE marcas SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = Marcas;