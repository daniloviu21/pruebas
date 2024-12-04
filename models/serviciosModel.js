const pool = require('../config/db');

class Servicios {

    static async obtenerServicios() {
        const result =  await pool.query('SELECT * FROM servicios');
        return result.rows;
    }

    static async create(data) {
        const {nombreServicio, descripcion, precio} = data;
        const result =  await pool.query('INSERT INTO servicios (nombreServicio, descripcion, precio) VALUES ($1, $2, $3) RETURNING *',[nombreServicio, descripcion, precio]);
        return result.rows[0];
    }

    static async update(id, data){
        const {nombreServicio, descripcion, precio} = data;
        const result = await pool.query('UPDATE servicios SET nombreServicio = $1, descripcion = $2, precio = $3, updated_at = now() WHERE id = $4 and deleted_at is null RETURNING *', [nombreServicio, descripcion, precio, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE servicios SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = Servicios;