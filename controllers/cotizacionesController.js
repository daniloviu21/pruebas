const Cotizacion = require('../models/cotizacionesModel');

class CotizacionesController {

    static async getAllQuotes(req, res)
    {
        try {
            const cotizaciones = await Cotizacion.obtenerCotizaciones();
            res.json(cotizaciones);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async create(req, res){
        try {
            const cotizaciones = await Cotizacion.create(req.body);
            res.status(201).json(cotizaciones);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async update(req, res){
        try {
            const cotizaciones = await Cotizacion.update(req.params.id, req.body);
            if (!cotizaciones) {
                return res.status(404).json({message: "Cotización no encontrada!"});
            }
            return res.json(cotizaciones);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async delete(req, res){
        try {
            const cotizaciones = await Cotizacion.delete(req.params.id);
            if (!cotizaciones) {
                return res.status(404).json({message: "Cotización no encontrada!"});
            }
            return res.json({message: "Cotización eliminada"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

}

module.exports = CotizacionesController;