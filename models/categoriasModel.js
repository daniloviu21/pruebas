const pool = require('../config/db');

class Categorias {

    static async obtenerCategorias(){
        const result = await pool.query('SELECT * FROM categorias');
        return result.rows;
    }

    static async create(data){
        const {nombreCategoria,descripcion} = data;
        const result = await pool.query('INSERT INTO categorias (nombreCategoria,descripcion) VALUES ($1,$2) RETURNING *',[nombreCategoria,descripcion]);
        return result.rows[0];
    }

    static async update(id, data){
        const {nombreCategoria,descripcion} = data;
        const result = await pool.query('UPDATE categorias SET nombreCategoria = $1, descripcion = $2, updated_at = now() WHERE id = $3 and deleted_at is null RETURNING *', [nombreCategoria, descripcion, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE categorias SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = Categorias;