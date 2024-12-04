const pool = require('../config/db');

class Departamentos {

    static async obtenerDepartamentos(){
        const result = await pool.query('SELECT * FROM departamentos');
        return result.rows;
    }

    static async create(data){
        const {nombreDepartamento} = data;
        const result = await pool.query('INSERT INTO departamentos (nombreDepartamento) VALUES ($1) RETURNING *',[nombreDepartamento]);
        return result.rows[0];
    }

    static async update(id, data){
        const {nombreDepartamento} = data;
        const result = await pool.query('UPDATE departamentos SET nombreDepartamento = $1, updated_at = now() WHERE id = $2 and deleted_at is null RETURNING *', [nombreDepartamento, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE departamentos SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = Departamentos;