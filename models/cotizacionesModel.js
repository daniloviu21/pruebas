const pool = require('../config/db');

class Cotizaciones {

    static async obtenerCotizaciones(){
        const result = await pool.query('SELECT * FROM cotizaciones');
        return result.rows;
    }

    static async create(data){
        const {descripcion, precio, fecha, estatus, formaPago, idCliente} = data;
        const result = await pool.query('INSERT INTO cotizaciones (descripcion, precio, fecha, estatus, formaPago, idCliente) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',[descripcion, precio, fecha, estatus, formaPago, idCliente]);
        return result.rows[0];
    }

    static async update(id, data){
        const {descripcion, precio, fecha, estatus, formaPago, idCliente} = data;
        const result = await pool.query('UPDATE cotizaciones SET descripcion = $1, precio = $2, fecha = $3, estatus = $4, formaPago = $5, idCliente = $6, updated_at = now() WHERE id = $7 and deleted_at is null RETURNING *', [descripcion, precio, fecha, estatus, formaPago, idCliente, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE cotizaciones SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }
    
    static async obtenerCotizacionesId(id){
        const result = await pool.query('SELECT * FROM cotizaciones WHERE id = $1', [id]);
        return result.rows[0];
    }
}

module.exports = Cotizaciones;