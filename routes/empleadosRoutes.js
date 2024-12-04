const express = require('express');
const EmpleadosController = require('../controllers/empleadosController');

const router = express.Router();

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Obtiene todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 *       500:
 *         description: Error en el servidor
 */
router.get('/empleados', EmpleadosController.getAllEmployees);

/**
 * @swagger
 * /api/empleados:
 *   post:
 *     summary: Crea un nuevo empleado y su usuario
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empleado:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   apellidoP:
 *                     type: string
 *                   apellidoM:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   correo:
 *                     type: string
 *                   fechanac:
 *                     type: string
 *                     format: date
 *                   idDepartamento:
 *                     type: integer
 *               usuario:
 *                 type: object
 *                 properties:
 *                   usuario:
 *                     type: string
 *                   contrasenia:
 *                     type: string
 *                   idRol:
 *                     type: integer
 *     responses:
 *       201:
 *         description: Empleado y usuario creados con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       400:
 *         description: Datos inválidos proporcionados
 *       500:
 *         description: Error en el servidor
 */
router.post('/empleados', EmpleadosController.createEmployee);

/**
 * @swagger
 * /api/empleados/{id}:
 *   get:
 *     summary: Obtiene un empleado por su ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/empleados/:id', EmpleadosController.getEmployeeById);

/**
 * @swagger
 * /api/empleados/{id}:
 *   put:
 *     summary: Actualiza un empleado por su ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del empleado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellidoP:
 *                 type: string
 *               apellidoM:
 *                 type: string
 *               telefono:
 *                 type: string
 *               correo:
 *                 type: string
 *               fechanac:
 *                 type: string
 *                 format: date
 *               idDepartamento:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Empleado actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       400:
 *         description: Datos inválidos proporcionados
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/empleados/:id', EmpleadosController.updateEmployee);

/**
 * @swagger
 * /api/empleados/{id}:
 *   delete:
 *     summary: Elimina un empleado por su ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del empleado a eliminar
 *     responses:
 *       200:
 *         description: Empleado eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/empleados/:id', EmpleadosController.deleteEmployeeAndUser);

module.exports = router;
