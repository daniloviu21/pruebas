const pool = require('../config/db');

class Empleados {
    static async obtenerEmpleados() {
        const result = await pool.query('SELECT * FROM empleados');
        return result.rows;
    }

    static async create(data) {
        const { nombre, apellidoP, apellidoM, telefono, correo, fechanac, idDepartamento, idUsuario } = data;
        const result = await pool.query('INSERT INTO empleados (nombre, apellidoP, apellidoM, telefono, correo, fechanac, idDepartamento, idUsuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',[nombre, apellidoP, apellidoM, telefono, correo, fechanac, idDepartamento, idUsuario]);
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM empleados WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { nombre, apellidoP, apellidoM, telefono, correo, fechanac, idDepartamento } = data;
        const result = await pool.query(`UPDATE empleados SET nombre = $1, apellidoP = $2, apellidoM = $3, telefono = $4, correo = $5, fechanac = $6, idDepartamento = $7, updated_at = now() WHERE id = $8 AND deleted_at IS NULL RETURNING *`,[nombre, apellidoP, apellidoM, telefono, correo, fechanac, idDepartamento, id]);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('UPDATE empleados SET deleted_at = now() WHERE id = $1 AND deleted_at IS NULL RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = Empleados;
