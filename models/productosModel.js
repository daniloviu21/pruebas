const pool = require('../config/db');

class Productos {

    static async obtenerProductos(){
        const result = await pool.query('SELECT * FROM productos');
        return result.rows;
    }

    static async create(data){
        const {nombreProducto, descripcion, precio, stock, idMarca, idCategoria} = data;
        const result = await pool.query('INSERT INTO productos (nombreProducto, descripcion, precio, stock, idMarca, idCategoria) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',[nombreProducto, descripcion, precio, stock, idMarca, idCategoria]);
        return result.rows[0];
    }

    static async update(id, data){
        const {nombreProducto, descripcion, precio, stock, idMarca, idCategoria} = data;
        const result = await pool.query('UPDATE productos SET nombreProducto = $1, descripcion = $2, precio = $3, stock = $4, idMarca = $5, idCategoria = $6, updated_at = now() WHERE id = $7 and deleted_at is null RETURNING *', [nombreProducto, descripcion, precio, stock, idMarca, idCategoria, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE productos SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }
    
    static async getProductId(id){
        const result = await pool.query('SELECT * FROM productos WHERE id = $1 AND deleted_at IS NULL', [id]);
        return result.rows[0];
    }

    static async updateStock(id, stock){
        const result = await pool.query('UPDATE productos SET stock = $1, updated_at = now() WHERE id = $2 RETURNING *',[stock, id]);
        return result.rows[0];
    }
}

module.exports = Productos;