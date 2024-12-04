const Empleados = require('../models/empleadosModel');
const Usuarios = require('../models/usuariosModel');

class EmpleadosController {
    static async getAllEmployees(req, res) {
        try {
            const employees = await Empleados.obtenerEmpleados();
            res.json(employees);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async createEmployee(req, res) {
        const { empleado, usuario } = req.body;

        try {
            const newUser = await Usuarios.create(usuario);
            empleado.idUsuario = newUser.id; 
            const newEmployee = await Empleados.create(empleado);
            res.status(201).json({ empleado: newEmployee, usuario: newUser });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async getEmployeeById(req, res) {
        try {
            const employee = await Empleados.findById(req.params.id);
            if (!employee) {
                return res.status(404).json({ message: "Empleado no encontrado!" });
            }
            return res.json(employee);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async updateEmployee(req, res) {
        const empleado = req.body; 
        const { id } = req.params;
    
        try {
            const updatedEmployee = await Empleados.update(id, empleado);
            if (!updatedEmployee) {
                return res.status(404).json({ message: "Empleado no encontrado o no actualizado!" });
            }
            return res.json({ empleado: updatedEmployee });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async deleteEmployeeAndUser(req, res) {
        const { id } = req.params; 
        try {
            const empleado = await Empleados.findById(id);
            if (!empleado) {
                return res.status(404).json({ message: "Empleado no encontrado!" });
            }
            const usuarioId = empleado.idUsuario; 
            const usuarioEliminado = await Usuarios.delete(usuarioId);
            if (!usuarioEliminado) {
                return res.status(404).json({ message: "Usuario no encontrado!" });
            }
            await Empleados.delete(id);
            return res.json({ message: "Empleado y usuario eliminados!" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = EmpleadosController;
