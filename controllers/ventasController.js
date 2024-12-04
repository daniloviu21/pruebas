const Ventas = require('../models/ventasModel');
const DetalleVentas = require('../models/detalleVentasModel');
const Producto = require('../models/productosModel');

class VentasController {
    static async createSale(req, res) {
        const { details } = req.body;
        let total = 0;
        
        try {
            for (let detail of details) {
                const producto = await Producto.getProductId(detail.IdProducto);
                if (!producto) {
                    return res.status(404).json({ message: 'Producto no encontrado' });
                }
                total += producto.precio * detail.cantidad;
            }
            const sale = await Ventas.create(total);
            for (let detail of details) {
                await DetalleVentas.create(sale.id, detail.IdProducto, detail.cantidad);
            }
            res.status(201).json({ sale, details });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = VentasController;
