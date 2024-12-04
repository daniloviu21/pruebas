const Usuario =  require('../models/usuariosModel');

class UsuariosController {
    static async getAllUsers(req, res)
    {
        try {
            const usuarios = await Usuario.obtenerUsuarios();
            res.json(usuarios);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async createUser(req, res){
        try {
            const usuarios = await Usuario.create(req.body);
            res.status(201).json(usuarios);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async getUserById(req, res){
        try {
            const usuarios = await Usuario.findById(req.params.id);
            if (!usuarios) {
                return res.status(404).json({message: "!Usuario no encontrado!"});
            }
            return res.json(usuarios);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async updateUser(req, res){
        try {
            const usuarios = await Usuario.update(req.params.id, req.body);
            if (!usuarios) {
                return res.status(404).json({message: "Usuario no encontrado!"});
            }
            return res.json(usuarios);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async deleteUser(req, res){
        try {
            const usuarios = await Usuario.delete(req.params.id);
            if (!usuarios) {
                return res.status(404).json({message: "Usuario no encontrado!"});
            }
            return res.json({message: "Usuario eliminado!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async getPasswordByUsername(req, res) {
        const { usuario } = req.params;
        try {
            const contrasenia = await Usuario.findPasswordByUsername(usuario);
            if (!contrasenia) {
                return res.status(404).json({ message: "Usuario no encontrado o contraseña no disponible!" });
            }
            return res.json({ usuario, contrasenia });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    
}

module.exports = UsuariosController;