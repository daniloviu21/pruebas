const Productos = require('../models/productosModel');
const Producto = require('../models/productosModel');

class ProductosController {

    static async getAllProducts(req, res)
    {
        try {
            const productos = await Producto.obtenerProductos();
            return res.json(productos);
        } catch (e) {
            return res.status(500).json({error: e.message});
        }
    }

    static async createProduct(req, res){
        try {
            const producto = await Producto.create(req.body);
            return res.status(201).json(producto);
        } catch (e) {
            return res.status(500).json({error: e.message});
        }
    }

    static async updateProduct(req, res){
        try {
            const producto = await Producto.update(req.params.id, req.body);
            if (!producto) {
                return res.status(404).json({message: "Product no encontrado!"});
            }
            return res.json(producto);
        } catch (e) {
            return res.status(500).json({error: e.message});
        }
    }

    static async deleteProduct(req, res){
        try {
            const producto = await Producto.delete(req.params.id);
            if (!producto) {
                return res.status(404).json({message: "Product no encontrado!"});
            }
            return res.json({message: "Producto eliminado!"});
        } catch (e) {
            return res.status(500).json({error: e.message});
        }
    }

    static async getProductById(req, res) {
        try {
            const producto = await Productos.getProductId(req.params.id);
            if (!producto) {
                return res.status(404).json({ message: "Producto no encontrado!" });
            }
            return res.json(producto);
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

}

module.exports = ProductosController;