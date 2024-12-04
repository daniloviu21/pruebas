/**
 * @swagger
 * components:
 *   schemas:
 *     Rol:
 *       type: object
 *       required:
 *         - rol
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del rol
 *         rol:
 *           type: string
 *           description: Nombre del rol (por ejemplo, "Administrador", "Usuario")
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del rol
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del rol
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación del rol (si corresponde)
 *       example:
 *         id: 1
 *         rol: "Administrador"
 *         created_at: "2024-11-13T00:00:00Z"
 *         updated_at: "2024-11-13T00:00:00Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtiene todos los roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rol'
 *       500:
 *         description: Error en el servidor
 * 
 *   post:
 *     summary: Crea un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rol:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rol creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       400:
 *         description: Datos inválidos proporcionados
 *       500:
 *         description: Error en el servidor
 * 
 * /api/roles/{id}:
 *   put:
 *     summary: Actualiza un rol por su ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del rol a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rol:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rol actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       400:
 *         description: Datos inválidos proporcionados
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 *   delete:
 *     summary: Elimina un rol por su ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del rol a eliminar
 *     responses:
 *       200:
 *         description: Rol eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error en el servidor
 */

const express = require('express');
const RolesController = require('../controllers/rolesController');

const router = express.Router();

router.get('/roles', RolesController.getAllRoles);
router.post('/roles', RolesController.createRol);
router.put('/roles/:id', RolesController.updateRol);
router.delete('/roles/:id', RolesController.deleteRol);

module.exports = router;
