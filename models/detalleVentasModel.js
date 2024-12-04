const pool = require('../config/db');
const Producto = require('./productosModel');

class DetalleVentas {
    static async create(IdVenta, IdProducto, cantidad) {
        const producto = await Producto.getProductId(IdProducto);

        if (!producto || producto.stock < cantidad) {
            throw new Error('Producto no disponible o stock insuficiente');
        }

        const result = await pool.query('INSERT INTO detalleVentas (IdVenta, IdProducto, cantidad) VALUES ($1, $2, $3) RETURNING *',[IdVenta, IdProducto, cantidad]);
        await Producto.updateStock(IdProducto, producto.stock - cantidad);
        return result.rows[0];
    }
}

module.exports = DetalleVentas;
