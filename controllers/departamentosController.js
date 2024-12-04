const Departamento = require('../models/departamentosModel');

class DepartamentosController {

    static async getAllDepartments(req, res)
    {
        try {
            const departamento = await Departamento.obtenerDepartamentos();
            res.json(departamento);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async createDepartment(req, res){
        try {
            const departamento = await Departamento.create(req.body);
            res.status(201).json(departamento);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async updateDepartment(req, res){
        try {
            const departamento = await Departamento.update(req.params.id, req.body);
            if (!departamento) {
                return res.status(404).json({message: "Departamento no encontrado!"});
            }
            return res.json(departamento);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async deleteDepartment(req, res){
        try {
            const departamento = await Departamento.delete(req.params.id);
            if (!departamento) {
                return res.status(404).json({message: "Departamento no encontrado!"});
            }
            return res.json({message: "Departamento eliminado!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

}

module.exports = DepartamentosController;