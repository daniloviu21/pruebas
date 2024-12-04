/**
 * @swagger
 * components:
 *   schemas:
 *     Departamento:
 *       type: object
 *       required:
 *         - nombreDepartamento
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del departamento
 *         nombreDepartamento:
 *           type: string
 *           description: Nombre del departamento
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del departamento
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del departamento
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación del departamento (si corresponde)
 *       example:
 *         id: 1
 *         nombreDepartamento: "Ventas"
 *         created_at: "2024-11-13T00:00:00Z"
 *         updated_at: "2024-11-13T00:00:00Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/departamentos:
 *   get:
 *     summary: Obtiene todos los departamentos
 *     tags: [Departamentos]
 *     responses:
 *       200:
 *         description: Lista de departamentos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Departamento'
 *       500:
 *         description: Error en el servidor
 * 
 *   post:
 *     summary: Crea un nuevo departamento
 *     tags: [Departamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreDepartamento:
 *                 type: string
 *                 description: Nombre del departamento
 *     responses:
 *       201:
 *         description: Departamento creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       400:
 *         description: Datos inválidos proporcionados
 *       500:
 *         description: Error en el servidor
 * 
 * /api/departamentos/{id}:
 *   get:
 *     summary: Obtiene un departamento por su ID
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 *   put:
 *     summary: Actualiza un departamento por su ID
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del departamento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreDepartamento:
 *                 type: string
 *                 description: Nombre del departamento
 *     responses:
 *       200:
 *         description: Departamento actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       400:
 *         description: Datos inválidos proporcionados
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 *   delete:
 *     summary: Elimina un departamento por su ID
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del departamento a eliminar
 *     responses:
 *       200:
 *         description: Departamento eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error en el servidor
 */

const express = require('express');
const DepartamentosController = require('../controllers/departamentosController');

const router = express.Router();

router.get('/departamentos', DepartamentosController.getAllDepartments);
router.post('/departamentos', DepartamentosController.createDepartment);
router.put('/departamentos/:id', DepartamentosController.updateDepartment);
router.delete('/departamentos/:id', DepartamentosController.deleteDepartment);

module.exports = router;
