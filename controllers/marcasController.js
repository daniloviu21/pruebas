const Marca = require('../models/marcasModel');

class MarcasController {

    static async getAllBrands(req, res)
    {
        try {
            const marca = await Marca.obtenerMarcas();
            res.json(marca);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async createBrand(req, res){
        try {
            const marca = await Marca.create(req.body);
            res.status(201).json(marca);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async updateBrand(req, res){
        try {
            const marca = await Marca.update(req.params.id, req.body);
            if (!marca) {
                return res.status(404).json({message: "Marca no encontrada!"});
            }
            return res.json(marca);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async deleteBrand(req, res){
        try {
            const marca = await Marca.delete(req.params.id);
            if (!marca) {
                return res.status(404).json({message: "Marca no encontrada!"});
            }
            return res.json({message: "Marca eliminada!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

}

module.exports = MarcasController;