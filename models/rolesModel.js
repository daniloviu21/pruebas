const pool = require('../config/db');

class Roles {

    static async obtenerRoles() {
        const result =  await pool.query('SELECT * FROM roles');
        return result.rows;
    }

    static async create(data) {
        const {rol} = data;
        const result =  await pool.query('INSERT INTO roles (rol) VALUES ($1) RETURNING *',[rol]);
        return result.rows[0];
    }

    static async update(id, data){
        const {rol} = data;
        const result = await pool.query('UPDATE roles SET rol = $1, updated_at = now() WHERE id = $2 and deleted_at is null RETURNING *', [rol, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE roles SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = Roles;