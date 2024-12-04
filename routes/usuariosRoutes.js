/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - usuario
 *         - contrasenia
 *         - idRol
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del usuario
 *         usuario:
 *           type: string
 *           description: Nombre del usuario
 *         contrasenia:
 *           type: string
 *           description: Contraseña del usuario (cifrada)
 *         idRol:
 *           type: integer
 *           description: ID del rol asociado al usuario
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del usuario
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación del usuario (si corresponde)
 *       example:
 *         id: 1
 *         usuario: "admin"
 *         contrasenia: "cifrada"
 *         idRol: 2
 *         created_at: "2024-11-13T00:00:00Z"
 *         updated_at: "2024-11-14T00:00:00Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error en el servidor
 * 
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 *   put:
 *     summary: Actualiza un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: Nombre del usuario
 *               contrasenia:
 *                 type: string
 *                 description: Contraseña del usuario
 *               idRol:
 *                 type: integer
 *                 description: ID del rol asociado al usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Datos inválidos proporcionados
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 * /api/usuarios/contrasenia/{usuario}:
 *   get:
 *     summary: Obtiene la contraseña del usuario por su nombre
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: usuario
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del usuario
 *     responses:
 *       200:
 *         description: Contraseña obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: string
 *                   description: Nombre del usuario
 *                 contrasenia:
 *                   type: string
 *                   description: Contraseña cifrada del usuario
 *       404:
 *         description: Usuario no encontrado o contraseña no disponible
 *       500:
 *         description: Error en el servidor
 */

const express = require('express');
const UsuariosController = require('../controllers/usuariosController');

const router = express.Router();

router.get('/usuarios', UsuariosController.getAllUsers);
router.get('/usuarios/:id', UsuariosController.getUserById);
router.put('/usuarios/:id', UsuariosController.updateUser);
router.get('/usuarios/contrasenia/:usuario', UsuariosController.getPasswordByUsername);

module.exports = router;
