const pool = require('../config/db');

class Clientes {
    static async obtenerClientes() {
        const result = await pool.query('SELECT * FROM clientes');
        return result.rows;
    }

    static async create(data) {
        const { nombreCliente, apellidoP, apellidoM, correo, telefono, idUsuario, publicId } = data;
        const result = await pool.query(
            'INSERT INTO clientes (nombreCliente, apellidoP, apellidoM, correo, telefono, idUsuario, publicId) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nombreCliente, apellidoP, apellidoM, correo, telefono, idUsuario, publicId]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { nombreCliente, apellidoP, apellidoM, correo, telefono, idUsuario, publicId } = data;
        const result = await pool.query(
            'UPDATE clientes SET nombreCliente = $1, apellidoP = $2, apellidoM = $3, correo = $4, telefono = $5, idUsuario = $6, publicId = $7, updated_at = now() WHERE id = $8 AND deleted_at IS NULL RETURNING *',
            [nombreCliente, apellidoP, apellidoM, correo, telefono, idUsuario, publicId, id]
        );
        return result.rows[0];
    }
    

    static async delete(id) {
        const result = await pool.query('UPDATE clientes SET deleted_at = now() WHERE id = $1 AND deleted_at IS NULL RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = Clientes;
