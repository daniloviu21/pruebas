const Servicio = require('../models/serviciosModel');

class ServiciosController {

    static async getAllServices(req, res)
    {
        try {
            const servicios = await Servicio.obtenerServicios();
            res.json(servicios);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async createService(req, res){
        try {
            const servicio = await Servicio.create(req.body);
            res.status(201).json(servicio);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async updateService(req, res){
        try {
            const servicio = await Servicio.update(req.params.id, req.body);
            if (!servicio) {
                return res.status(404).json({message: "!Servicio no encontrado!"});
            }
            return res.json(servicio);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async deleteService(req, res){
        try {
            const servicio = await Servicio.delete(req.params.id);
            if (!servicio) {
                return res.status(404).json({message: "Servicio no encontrado!"});
            }
            return res.json({message: "Servicio eliminado!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
}

module.exports = ServiciosController;