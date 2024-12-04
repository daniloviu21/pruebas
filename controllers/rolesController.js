const Rol = require('../models/rolesModel');

class RolesController {

    static async getAllRoles(req, res)
    {
        try {
            const rol = await Rol.obtenerRoles();
            res.json(rol);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async createRol(req, res){
        try {
            const rol = await Rol.create(req.body);
            res.status(201).json(rol);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async updateRol(req, res){
        try {
            const rol = await Rol.update(req.params.id, req.body);
            if (!rol) {
                return res.status(404).json({message: "Rol no encontrado!"});
            }
            return res.json(rol);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async deleteRol(req, res){
        try {
            const rol = await Rol.delete(req.params.id);
            if (!rol) {
                return res.status(404).json({message: "Rol no encontrado!"});
            }
            return res.json({message: "Rol eliminado!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

}

module.exports = RolesController;