const Categoria = require('../models/categoriasModel');

class CategoriasController {

    static async getAllCategories(req, res)
    {
        try {
            const categoria = await Categoria.obtenerCategorias();
            res.json(categoria);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async createCategorie(req, res){
        try {
            const categoria = await Categoria.create(req.body);
            res.status(201).json(categoria);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async updateCategorie(req, res){
        try {
            const categoria = await Categoria.update(req.params.id, req.body);
            if (!categoria) {
                return res.status(404).json({message: "Categoria no encontrada!"});
            }
            return res.json(categoria);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async deleteCategorie(req, res){
        try {
            const categoria = await Categoria.delete(req.params.id);
            if (!categoria) {
                return res.status(404).json({message: "Categoria no encontrada!"});
            }
            return res.json({message: "Categoria eliminada!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

}

module.exports = CategoriasController;