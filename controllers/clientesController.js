const Clientes = require('../models/clientesModel');
const Usuarios = require('../models/usuariosModel');

class ClientesController {
    static async getAllClients(req, res) {
        try {
            const clients = await Clientes.obtenerClientes();
            res.json(clients);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async createClient(req, res) {
        const { cliente, usuario } = req.body;

        try {
            const newUser = await Usuarios.create(usuario);
            cliente.idUsuario = newUser.id; 
            const newClient = await Clientes.create(cliente);
            res.status(201).json({ cliente: newClient, usuario: newUser });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async getClientById(req, res) {
        try {
            const client = await Clientes.findById(req.params.id);
            if (!client) {
                return res.status(404).json({ message: "Cliente no encontrado!" });
            }
            return res.json(client);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async updateClient(req, res) {
        const cliente = req.body; 
        const { id } = req.params;
    
        try {
            const updatedClient = await Clientes.update(id, cliente);
            if (!updatedClient) {
                return res.status(404).json({ message: "Cliente no encontrado o no actualizado!" });
            }
            return res.json({ cliente: updatedClient });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    
    static async deleteClientAndUser(req, res) {
        const { id } = req.params; 
        try {
            const cliente = await Clientes.findById(id);
            if (!cliente) {
                return res.status(404).json({ message: "Cliente no encontrado!" });
            }
            const usuarioId = cliente.idusuario; 
            const usuarioEliminado = await Usuarios.delete(usuarioId);
            if (!usuarioEliminado) {
                return res.status(404).json({ message: "Usuario no encontrado!" });
            }
            await Clientes.delete(id);
            return res.json({ message: "Cliente y usuario eliminados!" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = ClientesController;
